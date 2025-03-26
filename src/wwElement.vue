<template>
  <div class="weekly-schedule" :style="containerStyle" ref="scheduleContainer">
    <!-- Warning message when study hours goal is reached -->
    <div v-if="showWarning" class="goal-warning" :style="warningStyle">
      <div class="warning-content">
        <span class="warning-icon">⚠️</span>
        <span>{{ content.warningMessage || 'Você atingiu sua meta de horas de estudo para a semana!' }}</span>
      </div>
    </div>
    
    <!-- Progress indicator bar -->
    <div v-if="content.showProgressBar" class="progress-container" :style="progressContainerStyle">
      <div class="progress-label" :style="progressLabelStyle">
        <span>{{ getWeeklyProgressLabel() }}</span>
      </div>
      <div class="progress-bar" :style="progressBarContainerStyle">
        <div class="progress-fill" :style="progressBarFillStyle"></div>
      </div>
    </div>

    <!-- Header with hours goal -->
    <div class="schedule-header" :style="headerStyle">
      <!-- Hours goal with visual indicator -->
      <div class="hours-goal" :style="hoursGoalStyle">
        <span>{{ content.hoursGoalLabel || 'Meta de horas de estudo:' }}</span>
        <div class="hours-input-wrapper" :style="hoursInputWrapperStyle">
          <button 
            class="hours-adjust-btn" 
            :style="hoursAdjustBtnStyle" 
            @click="adjustHoursGoal(-1)"
            aria-label="Decrease weekly hours goal"
          >−</button>
          <input 
            type="number" 
            v-model.number="weeklyHoursGoal" 
            min="0" 
            max="168" 
            :style="hoursInputStyle"
            aria-label="Weekly hours goal"
          />
          <button 
            class="hours-adjust-btn" 
            :style="hoursAdjustBtnStyle" 
            @click="adjustHoursGoal(1)"
            aria-label="Increase weekly hours goal"
          >+</button>
        </div>
      </div>
    </div>

    <!-- Desktop view with multiple selection support -->
    <div class="desktop-view" v-if="!isMobileView || content.forceDesktopView">
      <div class="schedule-grid" :style="gridStyle">
        <!-- Header with days -->
        <div class="time-label" :style="cornerCellStyle" aria-hidden="true"></div>
        <div 
          v-for="day in days" 
          :key="`header-${day.value}`" 
          class="day-header"
          :style="dayHeaderStyle"
        >
          {{ day.label }}
        </div>
        
        <!-- Hour rows -->
        <template v-for="hour in visibleHours" :key="`row-${hour.value}`">
          <div class="time-label" :style="timeLabelStyle">
            {{ hour.label }}
          </div>
          
          <div 
            v-for="day in days" 
            :key="`cell-${day.value}-${hour.value}`"
            class="schedule-cell"
            :class="{
              'filled': getCellValue(day.value, hour.value),
              'study': getCellValue(day.value, hour.value) === 'study',
              'disabled': isStudyDisabled && !getCellValue(day.value, hour.value)
            }"
            :style="getCellStyle(day.value, hour.value)"
            @click="toggleCell(day.value, hour.value)"
            :data-day="day.value"
            :data-hour="hour.value"
            :aria-label="`${day.label} at ${hour.label}, ${getCellValue(day.value, hour.value) ? 'Estudo' : 'Vazio'}`"
            :aria-checked="!!getCellValue(day.value, hour.value)"
            role="checkbox"
            tabindex="0"
            @keydown.enter="toggleCell(day.value, hour.value)"
            @keydown.space.prevent="toggleCell(day.value, hour.value)"
          >
            <span v-if="getCellValue(day.value, hour.value)" :style="getCellTextStyle(day.value, hour.value)">
              {{ content.studyLabel || 'Estudo' }}
            </span>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Mobile view with improved touch interactions -->
    <div class="mobile-view" v-if="isMobileView && !content.forceDesktopView">
      <!-- Day selector with swipe support -->
      <div 
        class="day-selector" 
        :style="daySelectorStyle"
        ref="daySelector"
      >
        <button
          v-for="day in days"
          :key="`mobile-${day.value}`"
          class="day-selector-btn"
          :class="{ active: selectedMobileDay === day.value }"
          :style="getDaySelectorStyle(day)"
          @click="selectedMobileDay = day.value"
          :aria-pressed="selectedMobileDay === day.value"
          :aria-label="`Select ${day.label}`"
        >
          {{ day.shortLabel || day.label }}
        </button>
      </div>
      
      <!-- Hours grid for selected day with improved visuals -->
      <div class="mobile-hours-grid" :style="mobileGridStyle">
        <div 
          v-for="hour in visibleHours" 
          :key="`mobile-hour-${hour.value}`"
          class="mobile-hour-row"
          :style="mobileRowStyle"
        >
          <div class="mobile-time-label" :style="mobileTimeLabelStyle">
            {{ hour.label }}
          </div>
          
          <div 
            class="mobile-cell"
            :class="{
              'filled': getCellValue(selectedMobileDay, hour.value),
              'study': getCellValue(selectedMobileDay, hour.value) === 'study',
              'disabled': isStudyDisabled && !getCellValue(selectedMobileDay, hour.value)
            }"
            :style="getMobileCellStyle(selectedMobileDay, hour.value)"
            @click="toggleCell(selectedMobileDay, hour.value)"
            :data-day="selectedMobileDay"
            :data-hour="hour.value"
            :aria-label="`${hour.label}, ${getCellValue(selectedMobileDay, hour.value) ? 'Estudo' : 'Vazio'}`"
            :aria-checked="!!getCellValue(selectedMobileDay, hour.value)"
            role="checkbox"
            tabindex="0"
            @keydown.enter="toggleCell(selectedMobileDay, hour.value)"
            @keydown.space.prevent="toggleCell(selectedMobileDay, hour.value)"
          >
            <span v-if="getCellValue(selectedMobileDay, hour.value)" :style="getCellTextStyle(selectedMobileDay, hour.value)">
              {{ content.studyLabel || 'Estudo' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hours status with improved visuals -->
    <div class="hours-status" :style="hoursStatusStyle" v-if="content.showHoursStatus">
      <div class="type-status" :style="typeStatusStyle">
        <span class="status-color" :style="{ backgroundColor: content.studyColor || '#4CAF50', ...statusColorStyle }"></span>
        <span class="status-label" :style="statusLabelStyle">{{ content.studyLabel || 'Estudo' }}:</span>
        <span class="status-hours" :style="statusHoursStyle">{{ studyHours }}h</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { 
      type: Object, 
      required: true 
    },
    uid: {
      type: String,
      required: false
    },
    
    /* wwEditor:start */
    wwEditorState: { type: Object, required: false },
    /* wwEditor:end */
  },
  // Lista explícita de eventos emitidos
  emits: ['update:content', 'scheduleChanged', 'trigger-event'],

  data() {
    return {
      // Schedule state
      scheduleData: {},
      weeklyHoursGoal: 20,
      selectedMobileDay: 'monday',
      isMobileView: false,
      showWarning: false,
      warningTimer: null,
      
      // Touch interaction state
      touchStartX: 0,
      touchDeltaX: 0,
      
      // Default values - will be replaced by content props if provided
      days: [
        { value: 'sunday', label: 'Domingo', shortLabel: 'Dom' },
        { value: 'monday', label: 'Segunda', shortLabel: 'Seg' },
        { value: 'tuesday', label: 'Terça', shortLabel: 'Ter' },
        { value: 'wednesday', label: 'Quarta', shortLabel: 'Qua' },
        { value: 'thursday', label: 'Quinta', shortLabel: 'Qui' },
        { value: 'friday', label: 'Sexta', shortLabel: 'Sex' },
        { value: 'saturday', label: 'Sábado', shortLabel: 'Sáb' },
      ]
    };
  },
  computed: {
    // Visible hours - allows filtering specific hours
    visibleHours() {
      const startHour = this.content.startHour !== undefined ? this.content.startHour : 6;
      const endHour = this.content.endHour !== undefined ? this.content.endHour : 22;
      
      return Array.from({ length: (endHour - startHour) + 1 }, (_, i) => {
        const hour = startHour + i;
        return {
          value: hour,
          label: `${String(hour).padStart(2, '0')}:00`
        };
      });
    },
    
    // Study hours count
    studyHours() {
      let count = 0;
      
      // Count filled study hours
      Object.values(this.scheduleData).forEach(dayData => {
        if (dayData) {
          Object.values(dayData).forEach(cellType => {
            if (cellType === 'study') {
              count++;
            }
          });
        }
      });
      
      return count;
    },
    
    // Check if study hours are at or above goal
    isStudyDisabled() {
      return this.studyHours >= this.weeklyHoursGoal;
    },
    
    // Weekly goal progress percentage
    weeklyProgressPercentage() {
      if (this.weeklyHoursGoal <= 0) return 100;
      const percentage = (this.studyHours / this.weeklyHoursGoal) * 100;
      return Math.min(percentage, 100); // Cap at 100%
    },
    
    // Versão para uso interno do componente - usa o método para manter consistência
    filledCells() {
      return this.getFilledCellsArray();
    },
    
    // Get current day based on view mode
    currentDay() {
      return this.isMobileView && !this.content.forceDesktopView ? this.selectedMobileDay : this.days[0].value;
    },
    
    // Computed styles
    containerStyle() {
      return {
        fontFamily: this.content.fontFamily || 'Inter, system-ui, sans-serif',
        color: this.content.textColor || '#333',
        backgroundColor: this.content.backgroundColor || '#ffffff',
        borderRadius: this.content.borderRadius || '16px',
        overflow: 'hidden',
        boxShadow: this.content.showShadow ? (this.content.shadowStyle || '0 8px 30px rgba(0,0,0,0.12)') : 'none',
        border: this.content.showBorder ? `1px solid ${this.content.borderColor || '#eaeaea'}` : 'none',
        position: 'relative',
      };
    },
    
    warningStyle() {
      return {
        padding: '12px 20px',
        backgroundColor: this.content.warningBgColor || '#FFF3CD',
        color: this.content.warningTextColor || '#856404',
        borderBottom: `1px solid ${this.content.warningBorderColor || '#FFEEBA'}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
        animation: 'fade-in 0.3s ease',
      };
    },
    
    progressContainerStyle() {
      return {
        padding: '16px 20px 0 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      };
    },
    
    progressLabelStyle() {
      return {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.875rem',
        color: this.content.secondaryTextColor || '#666',
      };
    },
    
    progressBarContainerStyle() {
      return {
        height: '8px',
        backgroundColor: this.content.progressBarBgColor || '#e6e6e6',
        borderRadius: '4px',
        overflow: 'hidden',
      };
    },
    
    progressBarFillStyle() {
      const percentage = this.weeklyProgressPercentage;
      let color = this.content.progressBarColor || '#4CAF50';
      
      // Change color based on percentage
      if (percentage < 50) {
        color = this.content.progressBarLowColor || '#FFC107';
      }
      if (percentage < 25) {
        color = this.content.progressBarVeryLowColor || '#F44336';
      }
      
      return {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: color,
        transition: 'width 0.3s ease, background-color 0.3s ease',
      };
    },
    
    headerStyle() {
      return {
        padding: '16px 20px',
        display: 'flex',
        flexDirection: this.isMobileView ? 'column' : 'row',
        justifyContent: 'flex-end',
        alignItems: this.isMobileView ? 'stretch' : 'center',
        gap: '16px',
        borderBottom: `1px solid ${this.content.dividerColor || '#eaeaea'}`,
        backgroundColor: this.content.headerBgColor || '#FFFFFF',
      };
    },
    
    hoursGoalStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.9rem',
        color: this.content.secondaryTextColor || '#666',
        flexWrap: 'wrap',
      };
    },
    
    hoursInputWrapperStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: `1px solid ${this.content.inputBorderColor || '#ddd'}`,
        overflow: 'hidden',
      };
    },
    
    hoursAdjustBtnStyle() {
      return {
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: this.content.buttonBgColor || '#f5f5f5',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        color: this.content.buttonTextColor || '#555',
        userSelect: 'none',
      };
    },
    
    hoursInputStyle() {
      return {
        width: '40px',
        textAlign: 'center',
        padding: '5px 0',
        border: 'none',
        borderLeft: `1px solid ${this.content.inputBorderColor || '#ddd'}`,
        borderRight: `1px solid ${this.content.inputBorderColor || '#ddd'}`,
        outline: 'none',
        fontSize: '14px',
      };
    },
    
    gridStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `80px repeat(${this.days.length}, 1fr)`,
        overflow: 'auto',
        position: 'relative',
        minHeight: '300px',
      };
    },
    
    cornerCellStyle() {
      return {
        backgroundColor: this.content.cornerCellColor || '#f8f9fa',
        borderBottom: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        borderRight: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        padding: '10px',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 3,
      };
    },
    
    dayHeaderStyle() {
      return {
        padding: '16px 8px',
        textAlign: 'center',
        fontWeight: '600',
        backgroundColor: this.content.dayHeaderBgColor || '#f8f9fa',
        borderBottom: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        borderRight: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        position: 'sticky',
        top: 0,
        zIndex: 2,
      };
    },
    
    timeLabelStyle() {
      return {
        padding: '10px',
        textAlign: 'right',
        fontSize: '0.85rem',
        color: this.content.timeLabelColor || '#666',
        backgroundColor: this.content.timeLabelBgColor || '#f8f9fa',
        borderRight: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        borderBottom: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        position: 'sticky',
        left: 0,
        zIndex: 1,
      };
    },
    
    daySelectorStyle() {
      return {
        display: 'flex',
        overflowX: 'auto',
        backgroundColor: this.content.daySelectorBgColor || '#f8f9fa',
        padding: '12px 16px',
        gap: '8px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollBehavior: 'smooth',
        position: 'relative',
      };
    },
    
    mobileGridStyle() {
      return {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '16px',
      };
    },
    
    mobileRowStyle() {
      return {
        display: 'flex',
        borderBottom: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
      };
    },
    
    mobileTimeLabelStyle() {
      return {
        ...this.timeLabelStyle,
        width: '80px',
        flexShrink: 0,
        position: 'static',
      };
    },
    
    hoursStatusStyle() {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        backgroundColor: this.content.statusBgColor || '#ffffff',
        borderTop: `1px solid ${this.content.dividerColor || '#eaeaea'}`,
      };
    },
    
    typeStatusStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: this.content.statusItemBgColor || '#f8f8f8',
      };
    },
    
    statusColorStyle() {
      return {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        display: 'inline-block',
      };
    },
    
    statusLabelStyle() {
      return {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: this.content.statusLabelColor || '#444',
      };
    },
    
    statusHoursStyle() {
      return {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: this.content.statusHoursColor || '#333',
      };
    },
  },
  
  watch: {
    'content.initialData': {
      immediate: true,
      handler(newData) {
        if (newData) {
          try {
            // Se for uma string JSON, tentar parsear
            const parsedData = typeof newData === 'string' ? JSON.parse(newData) : newData;
            // Deep clone para evitar referências
            this.scheduleData = JSON.parse(JSON.stringify(parsedData));
          } catch (e) {
            console.error("Error parsing initialData:", e);
            this.scheduleData = {};
          }
        }
      }
    },
    'content.weeklyHoursGoal': {
      immediate: true,
      handler(newGoal) {
        if (newGoal !== undefined) {
          this.weeklyHoursGoal = parseInt(newGoal) || 0;
        }
      }
    },
    'content.days': {
      immediate: true,
      handler(newDays) {
        if (Array.isArray(newDays) && newDays.length > 0) {
          this.days = JSON.parse(JSON.stringify(newDays));
          
          // Ensure selectedMobileDay is valid
          if (!this.days.some(day => day.value === this.selectedMobileDay)) {
            this.selectedMobileDay = this.days[0].value;
          }
        }
      }
    },
    'scheduleData': {
      deep: true,
      handler() {
        this.emitChange();
      }
    },
    'weeklyHoursGoal'() {
      this.emitChange();
    },
    'studyHours'(newValue, oldValue) {
      // Show warning when study hours reach the goal
      if (newValue >= this.weeklyHoursGoal && oldValue < this.weeklyHoursGoal) {
        this.showGoalWarning();
      }
    },
  },
  
  mounted() {
    this.checkMobileView();
    window.addEventListener('resize', this.checkMobileView);
    
    // Initialize with empty data if needed
    if (Object.keys(this.scheduleData).length === 0) {
      this.initializeEmptySchedule();
    }
    
    // Add touch event listeners for mobile swipe
    if (this.$refs.daySelector) {
      this.$refs.daySelector.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      this.$refs.daySelector.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      this.$refs.daySelector.addEventListener('touchend', this.handleTouchEnd);
    }
    
    // INICIALIZAÇÃO WEWEB
    /* wwEditor:start */
    // Registrar o componente e seus eventos no WeWeb
    if (window.wwLib && window.wwLib.wwUtils) {
      try {
        console.log("[WeeklySchedule] Registrando componente no WeWeb");
        window.wwLib.wwUtils.triggerEvent('component-mounted', {
          componentId: this.uid || 'weekly-schedule',
          componentType: 'element',
          hasEvents: true,
          eventNames: ['scheduleChanged']
        });
      } catch (e) {
        console.error("[WeeklySchedule] Erro ao registrar componente:", e);
      }
    }
    /* wwEditor:end */
    
    // Emissão inicial para "registrar" os eventos
    this.$nextTick(() => {
      // Emite eventos para garantir que o WeWeb os reconheça
      this.emitChange();
    });
  },
  
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobileView);
    
    // Remove touch event listeners
    if (this.$refs.daySelector) {
      this.$refs.daySelector.removeEventListener('touchstart', this.handleTouchStart);
      this.$refs.daySelector.removeEventListener('touchmove', this.handleTouchMove);
      this.$refs.daySelector.removeEventListener('touchend', this.handleTouchEnd);
    }
    
    // Clear any timers
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
    }
  },
  
  methods: {
    // Data utilities
    formatDateToISOString(date) {
      return date.toISOString().split('T')[0];
    },
    
    getDatePlusDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    
    // Método para gerar array de células preenchidas
    getFilledCellsArray() {
      // Iniciando com um array vazio
      const cells = [];
      
      // Percorre todos os dias preenchidos
      Object.entries(this.scheduleData).forEach(([day, hours]) => {
        if (hours && Object.keys(hours).length > 0) {
          // Percorre todas as horas preenchidas deste dia
          Object.entries(hours).forEach(([hour, type]) => {
            if (type === 'study') {
              const dayObj = this.days.find(d => d.value === day) || { label: day };
              const hourInt = parseInt(hour);
              
              // Adiciona ao array cada célula preenchida
              cells.push({
                day,
                dayLabel: dayObj.label,
                hour: hourInt,
                hourLabel: `${String(hourInt).padStart(2, '0')}:00`,
                type: 'study',
                typeLabel: this.content.studyLabel || 'Estudo'
              });
            }
          });
        }
      });
      
      // Verificação de depuração
      console.log("[WeeklySchedule] Array de células gerado:", cells);
      
      // Retorna o array, garantindo que é um array mesmo que vazio
      return cells || [];
    },
    
    // Prepara dados do evento em formato compatível com WeWeb
    getEventData() {
      // Gera o array de células garantido como array antes de usá-lo
      const filledCells = this.getFilledCellsArray();
      
      return {
        // Garantindo que filledCells é sempre um array e não um objeto
        filledCells: Array.isArray(filledCells) ? filledCells : [],
        
        // Mantendo os outros dados como estavam
        studyHours: this.studyHours,
        weeklyHoursGoal: this.weeklyHoursGoal,
        weeklyProgressPercentage: this.weeklyProgressPercentage,
        
        // Incluindo dados completos para referência (não para o trigger de evento)
        data: JSON.parse(JSON.stringify(this.scheduleData))
      };
    },
  
    // Emissão de eventos compatível com WeWeb
    emitChange() {
      // Prepara os dados usando o método atualizado
      const eventData = this.getEventData();
      
      // Logs para facilitar depuração
      console.log("[WeeklySchedule] Emitindo evento scheduleChanged");
      console.log("[WeeklySchedule] filledCells é array?", Array.isArray(eventData.filledCells));
      console.log("[WeeklySchedule] Tamanho do array:", eventData.filledCells.length);
      
      // EMISSÃO PRINCIPAL: Direta com o nome esperado pelo WeWeb
      this.$emit('scheduleChanged', eventData);
      
      // FORMATO ALTERNATIVO #1: Via trigger-event
      this.$emit('trigger-event', {
        name: 'scheduleChanged',
        event: eventData
      });
      
      // FORMATO ALTERNATIVO #2: Formato explícito com array garantido
      this.$emit('trigger-event', {
        name: 'scheduleChanged',
        event: {
          // Garante explicitamente que é um array usando [...array]
          filledCells: [...eventData.filledCells],
          studyHours: eventData.studyHours,
          weeklyHoursGoal: eventData.weeklyHoursGoal,
          weeklyProgressPercentage: eventData.weeklyProgressPercentage
        }
      });
      
      /* wwEditor:start */
      // Atualizar o conteúdo no modo editor
      this.$emit('update:content', {
        ...this.content,
        weeklyHoursGoal: this.weeklyHoursGoal,
        // Salva também os dados da agenda para persistência
        initialData: JSON.stringify(this.scheduleData)
      });
      /* wwEditor:end */
    },
    
    // Utility methods
    initializeEmptySchedule() {
      const data = {};
      
      this.days.forEach(day => {
        data[day.value] = {};
      });
      
      this.scheduleData = data;
    },
    
    // Helper to get day label
    getDayLabel(dayValue) {
      const day = this.days.find(d => d.value === dayValue);
      return day ? day.label : dayValue;
    },
    
    checkMobileView() {
      this.isMobileView = window.innerWidth < (this.content.mobileBreakpoint || 768);
    },
    
    // Warning methods
    showGoalWarning() {
      this.showWarning = true;
      
      // Auto-hide warning after a delay
      if (this.warningTimer) {
        clearTimeout(this.warningTimer);
      }
      
      this.warningTimer = setTimeout(() => {
        this.showWarning = false;
      }, 5000);
    },
    
    // Cell methods
    getCellValue(day, hour) {
      return this.scheduleData[day] ? this.scheduleData[day][hour] || null : null;
    },
    
    toggleCell(day, hour) {
      // Ensure day exists in data structure
      if (!this.scheduleData[day]) {
        this.scheduleData[day] = {};
      }
      
      const currentValue = this.getCellValue(day, hour);
      
      // Handle study hours limit enforcement
      if (currentValue !== 'study' && this.isStudyDisabled) {
        this.showGoalWarning();
        return;
      }
      
      // Toggle cell value
      if (currentValue === 'study') {
        // Remove cell - use spread to create new reference and ensure reactivity
        const newDayData = { ...this.scheduleData[day] };
        delete newDayData[hour];
        this.scheduleData = {
          ...this.scheduleData,
          [day]: newDayData
        };
      } else {
        // Add cell as study - use spread to create new reference and ensure reactivity
        this.scheduleData = {
          ...this.scheduleData,
          [day]: {
            ...this.scheduleData[day],
            [hour]: 'study'
          }
        };
      }
      
      // Emit change event explicitamente (além do watch)
      this.emitChange();
    },
    
    // Progress indicator methods
    getWeeklyProgressLabel() {
      return `${this.studyHours} / ${this.weeklyHoursGoal} horas de estudo (${Math.round(this.weeklyProgressPercentage)}%)`;
    },
    
    adjustHoursGoal(amount) {
      const newGoal = Math.max(0, Math.min(168, this.weeklyHoursGoal + amount));
      this.weeklyHoursGoal = newGoal;
      
      // Emit change event explicitamente (além do watch)
      this.emitChange();
    },
    
    // Touch interaction methods for mobile
    handleTouchStart(event) {
      if (event.touches.length !== 1) return;
      this.touchStartX = event.touches[0].clientX;
      this.touchDeltaX = 0;
    },
    
    handleTouchMove(event) {
      if (event.touches.length !== 1) return;
      this.touchDeltaX = event.touches[0].clientX - this.touchStartX;
      
      // Prevent page scrolling when swiping the day selector
      if (Math.abs(this.touchDeltaX) > 10) {
        event.preventDefault();
      }
    },
    
    handleTouchEnd() {
      // If the swipe was significant enough, change the selected day
      if (Math.abs(this.touchDeltaX) > 50) {
        const dayIndex = this.days.findIndex(day => day.value === this.selectedMobileDay);
        let newIndex = dayIndex;
        
        if (this.touchDeltaX < 0) {
          // Swipe left - next day
          newIndex = Math.min(dayIndex + 1, this.days.length - 1);
        } else {
          // Swipe right - previous day
          newIndex = Math.max(dayIndex - 1, 0);
        }
        
        this.selectedMobileDay = this.days[newIndex].value;
        
        // Scroll to the selected day button
        this.$nextTick(() => {
          const selector = this.$refs.daySelector;
          const buttons = selector.querySelectorAll('.day-selector-btn');
          if (buttons[newIndex]) {
            buttons[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        });
      }
      
      this.touchStartX = 0;
      this.touchDeltaX = 0;
    },
    
    // Dynamic styles
    getCellStyle(day, hour) {
      const cellValue = this.getCellValue(day, hour);
      const isDisabled = this.isStudyDisabled && !cellValue;
      
      return {
        backgroundColor: cellValue === 'study' ? (this.content.studyColor || '#4CAF50') : (this.content.emptyCellColor || '#ffffff'),
        borderRight: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        borderBottom: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
        padding: '0',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        minHeight: this.content.cellHeight || '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        opacity: isDisabled ? '0.5' : '1',
      };
    },
    
    getMobileCellStyle(day, hour) {
      return {
        ...this.getCellStyle(day, hour),
        flex: '1',
        minHeight: this.content.mobileCellHeight || '60px',
        borderRadius: '4px',
        margin: '4px',
        border: `1px solid ${this.content.gridLineColor || '#eaeaea'}`,
      };
    },
    
    getCellTextStyle(day, hour) {
      return {
        color: this.content.studyTextColor || '#FFFFFF',
        fontSize: '0.85rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
      };
    },
    
    getDaySelectorStyle(day) {
      const isActive = this.selectedMobileDay === day.value;
      
      return {
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isActive ? (this.content.activeDayBgColor || '#2196F3') : 'transparent',
        color: isActive ? (this.content.activeDayTextColor || '#ffffff') : (this.content.inactiveDayColor || '#555'),
        fontWeight: isActive ? '600' : '400',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      };
    },
    
    // External action methods - Métodos para ações externas no WeWeb
    getScheduleData() {
      return this.getEventData();
    },
    
    clearSchedule() {
      this.initializeEmptySchedule();
      this.emitChange();
    },
    
    setCellValue(day, hour, type) {
      // Se type for true ou 'study', define como estudo, senão remove
      const value = type === true || type === 'study' ? 'study' : null;
      
      // Verificar se estamos tentando adicionar acima do limite
      if (value === 'study' && this.getCellValue(day, hour) !== 'study' && this.isStudyDisabled) {
        this.showGoalWarning();
        return;
      }
      
      if (!this.scheduleData[day]) {
        this.scheduleData[day] = {};
      }
      
      if (value === null) {
        // Remove value
        const newDayData = { ...this.scheduleData[day] };
        delete newDayData[hour];
        this.scheduleData = {
          ...this.scheduleData,
          [day]: newDayData
        };
      } else {
        // Set value
        this.scheduleData = {
          ...this.scheduleData,
          [day]: {
            ...this.scheduleData[day],
            [hour]: 'study'
          }
        };
      }
      
      // Emit change event explicitamente (além do watch)
      this.emitChange();
    },
    
    setWeeklyHoursGoal(goal) {
      this.weeklyHoursGoal = parseInt(goal) || 0;
      this.emitChange();
    },
    
    importSchedule(data) {
      if (data && typeof data === 'object') {
        try {
          // Se for uma string JSON, tentar parsear
          const parsedData = typeof newData === 'string' ? JSON.parse(data) : data;
          
          // Filtrar apenas os valores 'study'
          const filteredData = {};
          Object.entries(parsedData).forEach(([day, hours]) => {
            if (hours && Object.keys(hours).length > 0) {
              filteredData[day] = {};
              Object.entries(hours).forEach(([hour, type]) => {
                if (type === 'study') {
                  filteredData[day][hour] = 'study';
                }
              });
            }
          });
          
          // Deep clone para evitar referências
          this.scheduleData = JSON.parse(JSON.stringify(filteredData));
          
          // Emit change event explicitamente
          this.emitChange();
        } catch (e) {
          console.error("Error importing schedule data:", e);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.weekly-schedule {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
  
  .goal-warning {
    .warning-content {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      
      .warning-icon {
        font-size: 18px;
      }
    }
    
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  }
  
  .progress-container {
    .progress-bar {
      .progress-fill {
        transform-origin: left;
      }
    }
  }
  
  .schedule-header {
    .hours-goal {
      .hours-input-wrapper {
        .hours-adjust-btn {
          &:hover {
            background-color: rgba(0, 0, 0, 0.08);
          }
          
          &:active {
            background-color: rgba(0, 0, 0, 0.12);
          }
        }
        
        input {
          &:focus {
            background-color: rgba(33, 150, 243, 0.05);
          }
        }
      }
    }
  }
  
  .desktop-view {
    overflow-x: auto;
    
    .schedule-cell {
      position: relative;
      
      &:hover:not(.disabled) {
        opacity: 0.9;
        transform: scale(1.02);
        z-index: 1;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      &.disabled {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 10px,
            rgba(0, 0, 0, 0.08) 10px,
            rgba(0, 0, 0, 0.08) 20px
          );
          z-index: 1;
        }
      }
      
      &:focus:not(.disabled) {
        outline: 2px solid #2196F3;
        box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
        z-index: 2;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        transition: background-color 0.2s ease;
      }
      
      &.filled::after {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      &:active:not(.disabled)::after {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  .mobile-view {
    .day-selector {
      &::-webkit-scrollbar {
        display: none;
      }
      
      &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20px;
        pointer-events: none;
        z-index: 1;
      }
      
      &::before {
        left: 0;
        background: linear-gradient(to right, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
      }
      
      &::after {
        right: 0;
        background: linear-gradient(to left, rgba(248, 249, 250, 1), rgba(248, 249, 250, 0));
      }
      
      button {
        &:hover {
          transform: translateY(-1px);
        }
        
        &:active {
          transform: translateY(0);
        }
        
        &.active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
    
    .mobile-cell {
      &:hover:not(.disabled) {
        opacity: 0.9;
        transform: scale(1.02);
      }
      
      &:focus:not(.disabled) {
        outline: 2px solid #2196F3;
        box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
      }
      
      &:active:not(.disabled) {
        transform: scale(0.98);
      }
      
      &.disabled {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.05),
            rgba(0, 0, 0, 0.05) 10px,
            rgba(0, 0, 0, 0.08) 10px,
            rgba(0, 0, 0, 0.08) 20px
          );
          border-radius: 4px;
          z-index: 1;
        }
      }
    }
  }
  
  .hours-status {
    .type-status {
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
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

    <!-- Header with controls -->
    <div class="schedule-header" :style="headerStyle">
      <div class="scheduler-title" v-if="content.showTitle">
        <h3 :style="titleStyle">{{ content.title || '' }}</h3>
      </div>
      
      <!-- Activity type controls -->
      <div class="activity-types" :style="activityTypesStyle">
        <button 
          v-for="type in scheduleTypes" 
          :key="type.value"
          class="activity-button"
          :class="{ active: selectedType === type.value }"
          :style="getTypeButtonStyle(type)"
          @click="selectedType = type.value"
          :aria-label="`Select ${type.label} activity type`"
          :aria-pressed="selectedType === type.value"
        >
          <span class="activity-color" :style="{ backgroundColor: type.color }"></span>
          <span>{{ type.label }}</span>
        </button>
      </div>
      
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
              [`type-${getCellValue(day.value, hour.value)}`]: getCellValue(day.value, hour.value),
              'disabled': isStudyDisabled && selectedType === 'study' && !getCellValue(day.value, hour.value)
            }"
            :style="getCellStyle(day.value, hour.value)"
            @click="toggleCell(day.value, hour.value)"
            :data-day="day.value"
            :data-hour="hour.value"
            :aria-label="`${day.label} at ${hour.label}, ${getCellValue(day.value, hour.value) ? getCellTypeLabel(getCellValue(day.value, hour.value)) : 'Empty'}`"
            :aria-checked="!!getCellValue(day.value, hour.value)"
            role="checkbox"
            tabindex="0"
            @keydown.enter="toggleCell(day.value, hour.value)"
            @keydown.space.prevent="toggleCell(day.value, hour.value)"
          >
            <span v-if="getCellValue(day.value, hour.value)" :style="getCellTextStyle(day.value, hour.value)">
              {{ getCellTypeLabel(getCellValue(day.value, hour.value)) }}
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
              [`type-${getCellValue(selectedMobileDay, hour.value)}`]: getCellValue(selectedMobileDay, hour.value),
              'disabled': isStudyDisabled && selectedType === 'study' && !getCellValue(selectedMobileDay, hour.value)
            }"
            :style="getMobileCellStyle(selectedMobileDay, hour.value)"
            @click="toggleCell(selectedMobileDay, hour.value)"
            :data-day="selectedMobileDay"
            :data-hour="hour.value"
            :aria-label="`${hour.label}, ${getCellValue(selectedMobileDay, hour.value) ? getCellTypeLabel(getCellValue(selectedMobileDay, hour.value)) : 'Empty'}`"
            :aria-checked="!!getCellValue(selectedMobileDay, hour.value)"
            role="checkbox"
            tabindex="0"
            @keydown.enter="toggleCell(selectedMobileDay, hour.value)"
            @keydown.space.prevent="toggleCell(selectedMobileDay, hour.value)"
          >
            <span v-if="getCellValue(selectedMobileDay, hour.value)" :style="getCellTextStyle(selectedMobileDay, hour.value)">
              {{ getCellTypeLabel(getCellValue(selectedMobileDay, hour.value)) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Legend with improved visuals -->
    <div class="schedule-legend" :style="legendStyle" v-if="content.showLegend">
      <div 
        v-for="type in scheduleTypes" 
        :key="`legend-${type.value}`" 
        class="legend-item"
        :style="legendItemStyle"
      >
        <span class="legend-color" :style="{ backgroundColor: type.color, ...legendColorStyle }"></span>
        <span class="legend-text" :style="legendTextStyle">{{ type.legend || type.label }}</span>
      </div>
    </div>
    
    <!-- Hours status with improved visuals -->
    <div class="hours-status" :style="hoursStatusStyle" v-if="content.showHoursStatus">
      <div v-for="(count, type) in filledHours" :key="`status-${type}`" class="type-status" :style="typeStatusStyle">
        <span class="status-color" :style="{ backgroundColor: getTypeColor(type), ...statusColorStyle }"></span>
        <span class="status-label" :style="statusLabelStyle">{{ getTypeLabel(type) }}:</span>
        <span class="status-hours" :style="statusHoursStyle">{{ count }}h</span>
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
      required: true 
    },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  data() {
    return {
      // Schedule state
      scheduleData: {},
      selectedType: 'study',
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
      ],
      
      // Schedule types
      scheduleTypes: [
        { value: 'study', label: 'Estudo', color: '#4CAF50', textColor: '#FFFFFF', legend: 'Disponível para estudo' },
        { value: 'class', label: 'Aula', color: '#F44336', textColor: '#FFFFFF', legend: 'Compromisso (aula, estágio, etc.)' },
        { value: 'leisure', label: 'Lazer', color: '#2196F3', textColor: '#FFFFFF', legend: 'Lazer/Descanso' },
        { value: 'work', label: 'Trabalho', color: '#FF9800', textColor: '#FFFFFF', legend: 'Trabalho' },
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
    
    // Hours count by type
    filledHours() {
      const counts = {};
      
      // Initialize counts
      this.scheduleTypes.forEach(type => {
        counts[type.value] = 0;
      });
      
      // Count filled hours
      Object.values(this.scheduleData).forEach(dayData => {
        if (dayData) {
          Object.entries(dayData).forEach(([_, cellType]) => {
            if (cellType && counts[cellType] !== undefined) {
              counts[cellType]++;
            }
          });
        }
      });
      
      return counts;
    },
    
    // Study hours - only count study type
    studyHours() {
      return this.filledHours.study || 0;
    },
    
    // Check if study hours are at or above goal
    isStudyDisabled() {
      return this.studyHours >= this.weeklyHoursGoal;
    },
    
    // Weekly goal progress percentage (based only on study hours)
    weeklyProgressPercentage() {
      if (this.weeklyHoursGoal <= 0) return 100;
      const percentage = (this.studyHours / this.weeklyHoursGoal) * 100;
      return Math.min(percentage, 100); // Cap at 100%
    },
    
    // List of filled cells for use in actions/getters
    filledCells() {
      const cells = [];
      
      Object.entries(this.scheduleData).forEach(([day, hours]) => {
        if (hours) {
          Object.entries(hours).forEach(([hour, type]) => {
            if (type) {
              const dayObj = this.days.find(d => d.value === day);
              const hourInt = parseInt(hour);
              
              cells.push({
                day,
                dayLabel: dayObj ? dayObj.label : day,
                hour: hourInt,
                hourLabel: `${String(hourInt).padStart(2, '0')}:00`,
                type,
                typeLabel: this.getCellTypeLabel(type)
              });
            }
          });
        }
      });
      
      return cells;
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
        justifyContent: 'space-between',
        alignItems: this.isMobileView ? 'stretch' : 'center',
        gap: '16px',
        borderBottom: `1px solid ${this.content.dividerColor || '#eaeaea'}`,
        backgroundColor: this.content.headerBgColor || '#FFFFFF',
      };
    },
    
    activityTypesStyle() {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        flex: '1',
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
    
    titleStyle() {
      return {
        margin: '0',
        fontSize: this.content.titleSize || '1.4rem',
        fontWeight: '600',
        color: this.content.titleColor || '#333',
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
    
    legendStyle() {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        backgroundColor: this.content.legendBgColor || '#f8f9fa',
        borderTop: `1px solid ${this.content.dividerColor || '#eaeaea'}`,
      };
    },
    
    legendItemStyle() {
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      };
    },
    
    legendColorStyle() {
      return {
        width: '16px',
        height: '16px',
        borderRadius: this.content.legendColorRadius || '4px',
        display: 'inline-block',
      };
    },
    
    legendTextStyle() {
      return {
        fontSize: '0.9rem',
        color: this.content.legendTextColor || '#666',
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
        if (newData && typeof newData === 'object') {
          // Deep clone to avoid references
          this.scheduleData = JSON.parse(JSON.stringify(newData));
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
    'content.scheduleTypes': {
      immediate: true,
      handler(newTypes) {
        if (Array.isArray(newTypes) && newTypes.length > 0) {
          this.scheduleTypes = JSON.parse(JSON.stringify(newTypes));
          
          // Ensure selectedType is valid
          if (!this.scheduleTypes.some(type => type.value === this.selectedType)) {
            this.selectedType = this.scheduleTypes[0].value;
          }
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
    // Utility methods
    initializeEmptySchedule() {
      const data = {};
      
      this.days.forEach(day => {
        data[day.value] = {};
      });
      
      this.scheduleData = data;
    },
    
    checkMobileView() {
      this.isMobileView = window.innerWidth < (this.content.mobileBreakpoint || 768);
    },
    
    emitChange() {
      this.$emit('trigger-event', {
        name: 'scheduleChanged',
        event: {
          data: JSON.parse(JSON.stringify(this.scheduleData)),
          filledCells: this.filledCells,
          filledHours: this.filledHours,
          studyHours: this.studyHours,
          weeklyHoursGoal: this.weeklyHoursGoal,
          weeklyProgressPercentage: this.weeklyProgressPercentage,
        }
      });
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
    
    getCellTypeLabel(typeValue) {
      const type = this.scheduleTypes.find(t => t.value === typeValue);
      return type ? type.label : typeValue;
    },
    
    getTypeColor(typeValue) {
      const type = this.scheduleTypes.find(t => t.value === typeValue);
      return type ? type.color : '#cccccc';
    },
    
    getTypeLabel(typeValue) {
      const type = this.scheduleTypes.find(t => t.value === typeValue);
      return type ? type.label : typeValue;
    },
    
    toggleCell(day, hour) {
      // Ensure day exists in data structure
      if (!this.scheduleData[day]) {
        this.scheduleData[day] = {};
      }
      
      const currentValue = this.getCellValue(day, hour);
      
      // Handle study hours limit enforcement
      if (this.selectedType === 'study') {
        // Case 1: Adding study to an empty cell
        // Case 2: Changing from another activity type to study
        if (currentValue !== 'study' && this.isStudyDisabled) {
          this.showGoalWarning();
          return;
        }
      }
      
      // Toggle cell value
      if (currentValue === this.selectedType) {
        // Remove cell - use spread to create new reference and ensure reactivity
        const newDayData = { ...this.scheduleData[day] };
        delete newDayData[hour];
        this.scheduleData = {
          ...this.scheduleData,
          [day]: newDayData
        };
      } else {
        // Add or change cell - use spread to create new reference and ensure reactivity
        this.scheduleData = {
          ...this.scheduleData,
          [day]: {
            ...this.scheduleData[day],
            [hour]: this.selectedType
          }
        };
      }
    },
    
    // Progress indicator methods
    getWeeklyProgressLabel() {
      return `${this.studyHours} / ${this.weeklyHoursGoal} horas de estudo (${Math.round(this.weeklyProgressPercentage)}%)`;
    },
    
    adjustHoursGoal(amount) {
      const newGoal = Math.max(0, Math.min(168, this.weeklyHoursGoal + amount));
      this.weeklyHoursGoal = newGoal;
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
      const typeObj = this.scheduleTypes.find(t => t.value === cellValue);
      const isDisabled = this.isStudyDisabled && this.selectedType === 'study' && !cellValue;
      
      return {
        backgroundColor: typeObj ? typeObj.color : (this.content.emptyCellColor || '#ffffff'),
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
      const cellValue = this.getCellValue(day, hour);
      const typeObj = this.scheduleTypes.find(t => t.value === cellValue);
      
      return {
        color: typeObj ? (typeObj.textColor || '#ffffff') : '#333333',
        fontSize: '0.85rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
      };
    },
    
    getTypeButtonStyle(type) {
      const isActive = this.selectedType === type.value;
      
      return {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? (type.color + '20') : 'transparent',  // Transparent version of color
        color: isActive ? type.color : (this.content.buttonTextColor || '#555'),
        fontWeight: isActive ? '600' : '400',
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
    
    // External action methods
    getScheduleData() {
      return {
        data: JSON.parse(JSON.stringify(this.scheduleData)),
        filledCells: this.filledCells,
        filledHours: this.filledHours,
        studyHours: this.studyHours,
        weeklyHoursGoal: this.weeklyHoursGoal,
        weeklyProgressPercentage: this.weeklyProgressPercentage,
      };
    },
    
    clearSchedule() {
      this.initializeEmptySchedule();
    },
    
    setCellValue(day, hour, type) {
      const currentValue = this.getCellValue(day, hour);
      
      // Prevent setting study if at goal (unless removing or it's already study)
      if (type === 'study' && currentValue !== 'study' && this.isStudyDisabled) {
        this.showGoalWarning();
        return;
      }
      
      if (!this.scheduleData[day]) {
        this.scheduleData[day] = {};
      }
      
      if (type === null || type === undefined || type === '') {
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
            [hour]: type
          }
        };
      }
    },
    
    setWeeklyHoursGoal(goal) {
      this.weeklyHoursGoal = parseInt(goal) || 0;
    },
    
    setSelectedType(type) {
      const typeExists = this.scheduleTypes.some(t => t.value === type);
      if (typeExists) {
        this.selectedType = type;
      }
    },
    
    importSchedule(data) {
      if (data && typeof data === 'object') {
        this.scheduleData = JSON.parse(JSON.stringify(data));
      }
    },
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
    .activity-types {
      button {
        outline: none;
        
        .activity-color {
          width: 12px;
          height: 12px;
          border-radius: 4px;
          display: inline-block;
        }
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }
        
        &.active {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
      }
    }
    
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
  
  .schedule-legend {
    .legend-item {
      white-space: nowrap;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateX(3px);
        
        .legend-color {
          transform: scale(1.1);
        }
      }
      
      .legend-color {
        transition: transform 0.2s ease;
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
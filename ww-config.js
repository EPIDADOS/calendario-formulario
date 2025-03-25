module.exports = {
  editor: {
    label: {
      en: 'Weekly Schedule',
      pt: 'Horário Semanal',
    },
    icon: 'Calendar',
  },
  properties: {
    // Content properties
    title: {
      label: {
        en: 'Title',
        pt: 'Título',
      },
      type: 'Text',
      section: 'content',
      defaultValue: '',
      bindable: true,
    },
    showTitle: {
      label: {
        en: 'Show Title',
        pt: 'Mostrar Título',
      },
      type: 'OnOff',
      section: 'content',
      defaultValue: true,
      bindable: true,
    },
    hoursGoalLabel: {
      label: {
        en: 'Hours Goal Label',
        pt: 'Rótulo da Meta de Horas',
      },
      type: 'Text',
      section: 'content',
      defaultValue: 'Meta de horas de estudo:',
      bindable: true,
    },
    warningMessage: {
      label: {
        en: 'Study Limit Warning Message',
        pt: 'Mensagem de Aviso do Limite de Estudo',
      },
      type: 'Text',
      section: 'content',
      defaultValue: 'Você atingiu sua meta de horas de estudo para a semana!',
      bindable: true,
    },
    initialData: {
      label: {
        en: 'Initial Schedule Data',
        pt: 'Dados Iniciais da Agenda',
      },
      type: 'Object',
      section: 'data',
      defaultValue: {},
      bindable: true,
    },
    weeklyHoursGoal: {
      label: {
        en: 'Weekly Study Hours Goal',
        pt: 'Meta de Horas de Estudo Semanais',
      },
      type: 'Number',
      section: 'data',
      defaultValue: 20,
      bindable: true,
    },

    // Schedule configuration
    showProgressBar: {
      label: {
        en: 'Show Progress Bar',
        pt: 'Mostrar Barra de Progresso',
      },
      type: 'OnOff',
      section: 'schedule',
      defaultValue: true,
      bindable: true,
    },
    startHour: {
      label: {
        en: 'Start Hour',
        pt: 'Hora Inicial',
      },
      type: 'Number',
      section: 'schedule',
      defaultValue: 6,
      bindable: true,
      options: {
        min: 0,
        max: 23,
      },
    },
    endHour: {
      label: {
        en: 'End Hour',
        pt: 'Hora Final',
      },
      type: 'Number',
      section: 'schedule',
      defaultValue: 22,
      bindable: true,
      options: {
        min: 0,
        max: 23,
      },
    },
    showLegend: {
      label: {
        en: 'Show Legend',
        pt: 'Mostrar Legenda',
      },
      type: 'OnOff',
      section: 'schedule',
      defaultValue: true,
      bindable: true,
    },
    showHoursStatus: {
      label: {
        en: 'Show Hours Status',
        pt: 'Mostrar Status de Horas',
      },
      type: 'OnOff',
      section: 'schedule',
      defaultValue: true,
      bindable: true,
    },

    // Days, hours and activity types
    days: {
      label: {
        en: 'Days of Week',
        pt: 'Dias da Semana',
      },
      type: 'Array',
      section: 'schedule',
      defaultValue: [
        { value: 'sunday', label: 'Domingo', shortLabel: 'Dom' },
        { value: 'monday', label: 'Segunda', shortLabel: 'Seg' },
        { value: 'tuesday', label: 'Terça', shortLabel: 'Ter' },
        { value: 'wednesday', label: 'Quarta', shortLabel: 'Qua' },
        { value: 'thursday', label: 'Quinta', shortLabel: 'Qui' },
        { value: 'friday', label: 'Sexta', shortLabel: 'Sex' },
        { value: 'saturday', label: 'Sábado', shortLabel: 'Sáb' },
      ],
      bindable: true,
    },
    scheduleTypes: {
      label: {
        en: 'Schedule Types',
        pt: 'Tipos de Agenda',
      },
      type: 'Array',
      section: 'schedule',
      defaultValue: [
        {
          value: 'study',
          label: 'Estudo',
          color: '#4CAF50',
          textColor: '#FFFFFF',
          legend: 'Disponível para estudo',
        },
        {
          value: 'class',
          label: 'Aula',
          color: '#F44336',
          textColor: '#FFFFFF',
          legend: 'Compromisso (aula, estágio, etc.)',
        },
        {
          value: 'leisure',
          label: 'Lazer',
          color: '#2196F3',
          textColor: '#FFFFFF',
          legend: 'Lazer/Descanso',
        },
        {
          value: 'work',
          label: 'Trabalho',
          color: '#FF9800',
          textColor: '#FFFFFF',
          legend: 'Trabalho',
        },
      ],
      bindable: true,
    },

    // Responsiveness settings
    mobileBreakpoint: {
      label: {
        en: 'Mobile Breakpoint (px)',
        pt: 'Ponto de Quebra para Mobile (px)',
      },
      type: 'Number',
      section: 'responsiveness',
      defaultValue: 768,
      bindable: true,
    },
    forceDesktopView: {
      label: {
        en: 'Force Desktop View',
        pt: 'Forçar Visualização Desktop',
      },
      type: 'OnOff',
      section: 'responsiveness',
      defaultValue: false,
      bindable: true,
    },
    mobileCellHeight: {
      label: {
        en: 'Mobile Cell Height',
        pt: 'Altura da Célula em Mobile',
      },
      type: 'Length',
      section: 'responsiveness',
      defaultValue: '60px',
      bindable: true,
    },

    // General styles
    fontFamily: {
      label: {
        en: 'Font Family',
        pt: 'Família de Fonte',
      },
      type: 'FontFamily',
      section: 'style',
      defaultValue: 'Inter, system-ui, sans-serif',
      bindable: true,
    },
    textColor: {
      label: {
        en: 'Text Color',
        pt: 'Cor do Texto',
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#333333',
      bindable: true,
    },
    backgroundColor: {
      label: {
        en: 'Background Color',
        pt: 'Cor de Fundo',
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#ffffff',
      bindable: true,
    },
    borderRadius: {
      label: {
        en: 'Border Radius',
        pt: 'Raio da Borda',
      },
      type: 'Length',
      section: 'style',
      defaultValue: '16px',
      bindable: true,
    },
    showBorder: {
      label: {
        en: 'Show Border',
        pt: 'Mostrar Borda',
      },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
      bindable: true,
    },
    borderColor: {
      label: {
        en: 'Border Color',
        pt: 'Cor da Borda',
      },
      type: 'Color',
      section: 'style',
      defaultValue: '#eaeaea',
      bindable: true,
    },
    showShadow: {
      label: {
        en: 'Show Shadow',
        pt: 'Mostrar Sombra',
      },
      type: 'OnOff',
      section: 'style',
      defaultValue: true,
      bindable: true,
    },
    shadowStyle: {
      label: {
        en: 'Shadow Style',
        pt: 'Estilo da Sombra',
      },
      type: 'Text',
      section: 'style',
      defaultValue: '0 8px 30px rgba(0,0,0,0.12)',
      bindable: true,
    },

    // Warning styles
    warningBgColor: {
      label: {
        en: 'Warning Background Color',
        pt: 'Cor de Fundo do Aviso',
      },
      type: 'Color',
      section: 'warning',
      defaultValue: '#FFF3CD',
      bindable: true,
    },
    warningTextColor: {
      label: {
        en: 'Warning Text Color',
        pt: 'Cor do Texto do Aviso',
      },
      type: 'Color',
      section: 'warning',
      defaultValue: '#856404',
      bindable: true,
    },
    warningBorderColor: {
      label: {
        en: 'Warning Border Color',
        pt: 'Cor da Borda do Aviso',
      },
      type: 'Color',
      section: 'warning',
      defaultValue: '#FFEEBA',
      bindable: true,
    },

    // Header styles
    headerBgColor: {
      label: {
        en: 'Header Background',
        pt: 'Fundo do Cabeçalho',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#ffffff',
      bindable: true,
    },
    titleColor: {
      label: {
        en: 'Title Color',
        pt: 'Cor do Título',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#333333',
      bindable: true,
    },
    titleSize: {
      label: {
        en: 'Title Size',
        pt: 'Tamanho do Título',
      },
      type: 'Length',
      section: 'header',
      defaultValue: '1.4rem',
      bindable: true,
    },
    buttonTextColor: {
      label: {
        en: 'Button Text Color',
        pt: 'Cor do Texto do Botão',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#555555',
      bindable: true,
    },
    buttonBgColor: {
      label: {
        en: 'Button Background Color',
        pt: 'Cor de Fundo do Botão',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#f5f5f5',
      bindable: true,
    },
    secondaryTextColor: {
      label: {
        en: 'Secondary Text Color',
        pt: 'Cor do Texto Secundário',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#666666',
      bindable: true,
    },
    inputBorderColor: {
      label: {
        en: 'Input Border Color',
        pt: 'Cor da Borda do Input',
      },
      type: 'Color',
      section: 'header',
      defaultValue: '#dddddd',
      bindable: true,
    },

    // Progress bar styles
    progressBarBgColor: {
      label: {
        en: 'Progress Bar Background',
        pt: 'Fundo da Barra de Progresso',
      },
      type: 'Color',
      section: 'progressBar',
      defaultValue: '#e6e6e6',
      bindable: true,
    },
    progressBarColor: {
      label: {
        en: 'Progress Bar Color',
        pt: 'Cor da Barra de Progresso',
      },
      type: 'Color',
      section: 'progressBar',
      defaultValue: '#4CAF50',
      bindable: true,
    },
    progressBarLowColor: {
      label: {
        en: 'Progress Bar Low Color',
        pt: 'Cor da Barra de Progresso Baixa',
      },
      type: 'Color',
      section: 'progressBar',
      defaultValue: '#FFC107',
      bindable: true,
    },
    progressBarVeryLowColor: {
      label: {
        en: 'Progress Bar Very Low Color',
        pt: 'Cor da Barra de Progresso Muito Baixa',
      },
      type: 'Color',
      section: 'progressBar',
      defaultValue: '#F44336',
      bindable: true,
    },

    // Grid styles
    gridLineColor: {
      label: {
        en: 'Grid Line Color',
        pt: 'Cor das Linhas do Grid',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#eaeaea',
      bindable: true,
    },
    cornerCellColor: {
      label: {
        en: 'Corner Cell Color',
        pt: 'Cor da Célula de Canto',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    dayHeaderBgColor: {
      label: {
        en: 'Day Header Background',
        pt: 'Fundo do Cabeçalho de Dia',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    timeLabelColor: {
      label: {
        en: 'Time Label Color',
        pt: 'Cor do Rótulo de Hora',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#666666',
      bindable: true,
    },
    timeLabelBgColor: {
      label: {
        en: 'Time Label Background',
        pt: 'Fundo do Rótulo de Hora',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    emptyCellColor: {
      label: {
        en: 'Empty Cell Color',
        pt: 'Cor da Célula Vazia',
      },
      type: 'Color',
      section: 'grid',
      defaultValue: '#ffffff',
      bindable: true,
    },
    cellHeight: {
      label: {
        en: 'Cell Height',
        pt: 'Altura da Célula',
      },
      type: 'Length',
      section: 'grid',
      defaultValue: '52px',
      bindable: true,
    },

    // Mobile selector styles
    daySelectorBgColor: {
      label: {
        en: 'Day Selector Background',
        pt: 'Fundo do Seletor de Dia',
      },
      type: 'Color',
      section: 'mobile',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    activeDayBgColor: {
      label: {
        en: 'Active Day Background',
        pt: 'Fundo do Dia Ativo',
      },
      type: 'Color',
      section: 'mobile',
      defaultValue: '#2196F3',
      bindable: true,
    },
    activeDayTextColor: {
      label: {
        en: 'Active Day Text Color',
        pt: 'Cor do Texto do Dia Ativo',
      },
      type: 'Color',
      section: 'mobile',
      defaultValue: '#ffffff',
      bindable: true,
    },
    inactiveDayColor: {
      label: {
        en: 'Inactive Day Color',
        pt: 'Cor do Dia Inativo',
      },
      type: 'Color',
      section: 'mobile',
      defaultValue: '#555555',
      bindable: true,
    },

    // Legend styles
    legendBgColor: {
      label: {
        en: 'Legend Background',
        pt: 'Fundo da Legenda',
      },
      type: 'Color',
      section: 'legend',
      defaultValue: '#f8f9fa',
      bindable: true,
    },
    legendTextColor: {
      label: {
        en: 'Legend Text Color',
        pt: 'Cor do Texto da Legenda',
      },
      type: 'Color',
      section: 'legend',
      defaultValue: '#666666',
      bindable: true,
    },
    legendColorRadius: {
      label: {
        en: 'Legend Color Radius',
        pt: 'Raio das Cores da Legenda',
      },
      type: 'Length',
      section: 'legend',
      defaultValue: '4px',
      bindable: true,
    },

    // Status styles
    statusBgColor: {
      label: {
        en: 'Status Background',
        pt: 'Fundo do Status',
      },
      type: 'Color',
      section: 'status',
      defaultValue: '#ffffff',
      bindable: true,
    },
    statusItemBgColor: {
      label: {
        en: 'Status Item Background',
        pt: 'Fundo do Item de Status',
      },
      type: 'Color',
      section: 'status',
      defaultValue: '#f8f8f8',
      bindable: true,
    },
    statusLabelColor: {
      label: {
        en: 'Status Label Color',
        pt: 'Cor do Rótulo de Status',
      },
      type: 'Color',
      section: 'status',
      defaultValue: '#444444',
      bindable: true,
    },
    statusHoursColor: {
      label: {
        en: 'Status Hours Color',
        pt: 'Cor das Horas de Status',
      },
      type: 'Color',
      section: 'status',
      defaultValue: '#333333',
      bindable: true,
    },
    dividerColor: {
      label: {
        en: 'Divider Color',
        pt: 'Cor do Divisor',
      },
      type: 'Color',
      section: 'status',
      defaultValue: '#eaeaea',
      bindable: true,
    },
  },
  triggerEvents: [
    {
      name: 'scheduleChanged',
      label: {
        en: 'Schedule Changed',
        pt: 'Agenda Alterada',
      },
      event: {
        data: 'object',
        filledCells: 'array',
        filledHours: 'object',
        studyHours: 'number',
        weeklyHoursGoal: 'number',
        weeklyProgressPercentage: 'number',
      },
    },
  ],
  getters: {
    scheduleData: {
      label: {
        en: 'Schedule Data',
        pt: 'Dados da Agenda',
      },
      description: {
        en: 'Returns the complete schedule data',
        pt: 'Retorna os dados completos da agenda',
      },
      getter: 'return this.getScheduleData();',
    },
    filledCells: {
      label: {
        en: 'Filled Cells',
        pt: 'Células Preenchidas',
      },
      description: {
        en: 'Returns array of all filled cells with details',
        pt: 'Retorna array de todas as células preenchidas com detalhes',
      },
      getter: 'return this.filledCells;',
    },
    filledHoursCount: {
      label: {
        en: 'Filled Hours Count',
        pt: 'Contagem de Horas Preenchidas',
      },
      description: {
        en: 'Returns count of hours by type',
        pt: 'Retorna contagem de horas por tipo',
      },
      getter: 'return this.filledHours;',
    },
    studyHoursCount: {
      label: {
        en: 'Study Hours Count',
        pt: 'Contagem de Horas de Estudo',
      },
      description: {
        en: 'Returns count of study hours',
        pt: 'Retorna contagem de horas de estudo',
      },
      getter: 'return this.studyHours;',
    },
    weeklyGoal: {
      label: {
        en: 'Weekly Study Hours Goal',
        pt: 'Meta de Horas de Estudo Semanais',
      },
      description: {
        en: 'Returns the current weekly study hours goal',
        pt: 'Retorna a meta atual de horas de estudo semanais',
      },
      getter: 'return this.weeklyHoursGoal;',
    },
    weeklyProgressPercentage: {
      label: {
        en: 'Weekly Progress Percentage',
        pt: 'Percentual de Progresso Semanal',
      },
      description: {
        en: 'Returns the percentage of weekly study goal completed',
        pt: 'Retorna o percentual da meta semanal de estudo concluída',
      },
      getter: 'return this.weeklyProgressPercentage;',
    },
    isStudyLimitReached: {
      label: {
        en: 'Is Study Limit Reached',
        pt: 'Limite de Estudo Atingido',
      },
      description: {
        en: 'Returns true if study hours goal is reached',
        pt: 'Retorna verdadeiro se a meta de horas de estudo foi atingida',
      },
      getter: 'return this.isStudyDisabled;',
    },
  },
  actions: [
    {
      name: 'clearSchedule',
      label: {
        en: 'Clear Schedule',
        pt: 'Limpar Agenda',
      },
      action: 'this.clearSchedule();',
    },
    {
      name: 'setCellValue',
      label: {
        en: 'Set Cell Value',
        pt: 'Definir Valor da Célula',
      },
      params: [
        {
          name: 'day',
          type: 'string',
          label: {
            en: 'Day',
            pt: 'Dia',
          },
          required: true,
        },
        {
          name: 'hour',
          type: 'number',
          label: {
            en: 'Hour',
            pt: 'Hora',
          },
          required: true,
        },
        {
          name: 'type',
          type: 'string',
          label: {
            en: 'Type',
            pt: 'Tipo',
          },
          required: false,
        },
      ],
      action: 'this.setCellValue(params.day, params.hour, params.type);',
    },
    {
      name: 'setWeeklyHoursGoal',
      label: {
        en: 'Set Weekly Study Hours Goal',
        pt: 'Definir Meta de Horas de Estudo Semanais',
      },
      params: [
        {
          name: 'goal',
          type: 'number',
          label: {
            en: 'Goal',
            pt: 'Meta',
          },
          required: true,
        },
      ],
      action: 'this.setWeeklyHoursGoal(params.goal);',
    },
    {
      name: 'setSelectedType',
      label: {
        en: 'Set Selected Activity Type',
        pt: 'Definir Tipo de Atividade Selecionado',
      },
      params: [
        {
          name: 'type',
          type: 'string',
          label: {
            en: 'Type Value',
            pt: 'Valor do Tipo',
          },
          required: true,
        },
      ],
      action: 'this.setSelectedType(params.type);',
    },
    {
      name: 'importSchedule',
      label: {
        en: 'Import Schedule Data',
        pt: 'Importar Dados da Agenda',
      },
      params: [
        {
          name: 'data',
          type: 'object',
          label: {
            en: 'Schedule Data',
            pt: 'Dados da Agenda',
          },
          required: true,
        },
      ],
      action: 'this.importSchedule(params.data);',
    },
  ],
};

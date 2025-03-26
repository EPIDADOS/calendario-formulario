export default {
  editor: {
    label: {
      en: 'Weekly Schedule',
      pt: 'Cronograma Semanal',
    },
    icon: 'calendar-days',
    bubble: {
      icon: 'calendar-days',
    },
    customStylePropertiesOrder: [
      'backgroundColor',
      'textColor',
      'titleColor',
      'secondaryTextColor',
      'borderColor',
      'dividerColor',
      'gridLineColor',
      'fontFamily',
      'borderRadius',
      'showShadow',
      'shadowStyle',
      'showBorder',
    ],
  },
  properties: {
    // Main configuration
    title: {
      label: {
        en: 'Title',
        pt: 'Título',
      },
      type: 'Text',
      defaultValue: 'Weekly Schedule',
      bindable: true,
      section: 'Content',
    },
    showTitle: {
      label: {
        en: 'Show Title',
        pt: 'Mostrar Título',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Content',
    },
    weeklyHoursGoal: {
      label: {
        en: 'Weekly Hours Goal',
        pt: 'Meta de Horas Semanais',
      },
      type: 'Number',
      defaultValue: 20,
      bindable: true,
      section: 'Content',
    },
    hoursGoalLabel: {
      label: {
        en: 'Hours Goal Label',
        pt: 'Rótulo da Meta de Horas',
      },
      type: 'Text',
      defaultValue: 'Meta de horas de estudo:',
      bindable: true,
      section: 'Content',
    },
    startHour: {
      label: {
        en: 'Start Hour',
        pt: 'Hora Inicial',
      },
      type: 'Number',
      defaultValue: 6,
      bindable: true,
      section: 'Content',
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
      defaultValue: 22,
      bindable: true,
      section: 'Content',
      options: {
        min: 0,
        max: 23,
      },
    },

    // Schedule Data
    initialData: {
      label: {
        en: 'Initial Schedule Data',
        pt: 'Dados Iniciais da Agenda',
      },
      type: 'Text',
      defaultValue: '{}',
      bindable: true,
      section: 'Data',
      /* wwEditor:start */
      options: {
        expandable: true,
      },
      /* wwEditor:end */
    },

    // Schedule Types (Activity Types)
    scheduleTypes: {
      label: {
        en: 'Schedule Types',
        pt: 'Tipos de Atividades',
      },
      type: 'Array',
      bindable: true,
      section: 'Types',
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
      /* wwEditor:start */
      options: {
        item: {
          value: {
            label: {
              en: 'Value',
              pt: 'Valor',
            },
            type: 'Text',
          },
          label: {
            label: {
              en: 'Label',
              pt: 'Rótulo',
            },
            type: 'Text',
          },
          color: {
            label: {
              en: 'Color',
              pt: 'Cor',
            },
            type: 'Color',
          },
          textColor: {
            label: {
              en: 'Text Color',
              pt: 'Cor do Texto',
            },
            type: 'Color',
          },
          legend: {
            label: {
              en: 'Legend',
              pt: 'Legenda',
            },
            type: 'Text',
          },
        },
      },
      /* wwEditor:end */
    },

    // Days configuration
    days: {
      label: {
        en: 'Days',
        pt: 'Dias',
      },
      type: 'Array',
      bindable: true,
      section: 'Days',
      defaultValue: [
        { value: 'sunday', label: 'Domingo', shortLabel: 'Dom' },
        { value: 'monday', label: 'Segunda', shortLabel: 'Seg' },
        { value: 'tuesday', label: 'Terça', shortLabel: 'Ter' },
        { value: 'wednesday', label: 'Quarta', shortLabel: 'Qua' },
        { value: 'thursday', label: 'Quinta', shortLabel: 'Qui' },
        { value: 'friday', label: 'Sexta', shortLabel: 'Sex' },
        { value: 'saturday', label: 'Sábado', shortLabel: 'Sáb' },
      ],
      /* wwEditor:start */
      options: {
        item: {
          value: {
            label: {
              en: 'Value',
              pt: 'Valor',
            },
            type: 'Text',
          },
          label: {
            label: {
              en: 'Label',
              pt: 'Rótulo',
            },
            type: 'Text',
          },
          shortLabel: {
            label: {
              en: 'Short Label',
              pt: 'Rótulo Curto',
            },
            type: 'Text',
          },
        },
      },
      /* wwEditor:end */
    },

    // Progress Bar
    showProgressBar: {
      label: {
        en: 'Show Progress Bar',
        pt: 'Mostrar Barra de Progresso',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Progress',
    },
    progressBarColor: {
      label: {
        en: 'Progress Bar Color',
        pt: 'Cor da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#4CAF50',
      section: 'Progress',
    },
    progressBarLowColor: {
      label: {
        en: 'Progress Bar Low Color',
        pt: 'Cor da Barra de Progresso (Baixo)',
      },
      type: 'Color',
      defaultValue: '#FFC107',
      section: 'Progress',
    },
    progressBarVeryLowColor: {
      label: {
        en: 'Progress Bar Very Low Color',
        pt: 'Cor da Barra de Progresso (Muito Baixo)',
      },
      type: 'Color',
      defaultValue: '#F44336',
      section: 'Progress',
    },
    progressBarBgColor: {
      label: {
        en: 'Progress Bar Background',
        pt: 'Fundo da Barra de Progresso',
      },
      type: 'Color',
      defaultValue: '#e6e6e6',
      section: 'Progress',
    },

    // Warning Message
    warningMessage: {
      label: {
        en: 'Goal Warning Message',
        pt: 'Mensagem de Aviso de Meta',
      },
      type: 'Text',
      defaultValue: 'Você atingiu sua meta de horas de estudo para a semana!',
      bindable: true,
      section: 'Warning',
    },
    warningBgColor: {
      label: {
        en: 'Warning Background',
        pt: 'Fundo do Aviso',
      },
      type: 'Color',
      defaultValue: '#FFF3CD',
      section: 'Warning',
    },
    warningTextColor: {
      label: {
        en: 'Warning Text Color',
        pt: 'Cor do Texto do Aviso',
      },
      type: 'Color',
      defaultValue: '#856404',
      section: 'Warning',
    },
    warningBorderColor: {
      label: {
        en: 'Warning Border Color',
        pt: 'Cor da Borda do Aviso',
      },
      type: 'Color',
      defaultValue: '#FFEEBA',
      section: 'Warning',
    },

    // Legend
    showLegend: {
      label: {
        en: 'Show Legend',
        pt: 'Mostrar Legenda',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Legend',
    },
    legendBgColor: {
      label: {
        en: 'Legend Background',
        pt: 'Fundo da Legenda',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      section: 'Legend',
    },
    legendTextColor: {
      label: {
        en: 'Legend Text Color',
        pt: 'Cor do Texto da Legenda',
      },
      type: 'Color',
      defaultValue: '#666',
      section: 'Legend',
    },
    legendColorRadius: {
      label: {
        en: 'Legend Color Radius',
        pt: 'Raio das Cores da Legenda',
      },
      type: 'Text',
      defaultValue: '4px',
      section: 'Legend',
    },

    // Status Section
    showHoursStatus: {
      label: {
        en: 'Show Hours Status',
        pt: 'Mostrar Status das Horas',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Status',
    },
    statusBgColor: {
      label: {
        en: 'Status Background',
        pt: 'Fundo do Status',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      section: 'Status',
    },
    statusItemBgColor: {
      label: {
        en: 'Status Item Background',
        pt: 'Fundo do Item de Status',
      },
      type: 'Color',
      defaultValue: '#f8f8f8',
      section: 'Status',
    },
    statusLabelColor: {
      label: {
        en: 'Status Label Color',
        pt: 'Cor do Rótulo de Status',
      },
      type: 'Color',
      defaultValue: '#444',
      section: 'Status',
    },
    statusHoursColor: {
      label: {
        en: 'Status Hours Color',
        pt: 'Cor das Horas de Status',
      },
      type: 'Color',
      defaultValue: '#333',
      section: 'Status',
    },

    // Mobile Settings
    mobileBreakpoint: {
      label: {
        en: 'Mobile Breakpoint',
        pt: 'Ponto de Quebra Mobile',
      },
      type: 'Number',
      defaultValue: 768,
      section: 'Mobile',
    },
    forceDesktopView: {
      label: {
        en: 'Force Desktop View',
        pt: 'Forçar Visualização Desktop',
      },
      type: 'OnOff',
      defaultValue: false,
      section: 'Mobile',
    },
    mobileCellHeight: {
      label: {
        en: 'Mobile Cell Height',
        pt: 'Altura da Célula Mobile',
      },
      type: 'Text',
      defaultValue: '60px',
      section: 'Mobile',
    },
    activeDayBgColor: {
      label: {
        en: 'Active Day Background',
        pt: 'Fundo do Dia Ativo',
      },
      type: 'Color',
      defaultValue: '#2196F3',
      section: 'Mobile',
    },
    activeDayTextColor: {
      label: {
        en: 'Active Day Text Color',
        pt: 'Cor do Texto do Dia Ativo',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      section: 'Mobile',
    },
    inactiveDayColor: {
      label: {
        en: 'Inactive Day Color',
        pt: 'Cor do Dia Inativo',
      },
      type: 'Color',
      defaultValue: '#555',
      section: 'Mobile',
    },

    // Grid Style Properties
    cellHeight: {
      label: {
        en: 'Cell Height',
        pt: 'Altura da Célula',
      },
      type: 'Text',
      defaultValue: '52px',
      section: 'Grid',
    },
    emptyCellColor: {
      label: {
        en: 'Empty Cell Color',
        pt: 'Cor da Célula Vazia',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      section: 'Grid',
    },
    cornerCellColor: {
      label: {
        en: 'Corner Cell Color',
        pt: 'Cor da Célula de Canto',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      section: 'Grid',
    },
    dayHeaderBgColor: {
      label: {
        en: 'Day Header Background',
        pt: 'Fundo do Cabeçalho do Dia',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      section: 'Grid',
    },
    timeLabelColor: {
      label: {
        en: 'Time Label Color',
        pt: 'Cor do Rótulo da Hora',
      },
      type: 'Color',
      defaultValue: '#666',
      section: 'Grid',
    },
    timeLabelBgColor: {
      label: {
        en: 'Time Label Background',
        pt: 'Fundo do Rótulo da Hora',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      section: 'Grid',
    },
    gridLineColor: {
      label: {
        en: 'Grid Line Color',
        pt: 'Cor da Linha da Grade',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      section: 'Grid',
    },
    daySelectorBgColor: {
      label: {
        en: 'Day Selector Background',
        pt: 'Fundo do Seletor de Dia',
      },
      type: 'Color',
      defaultValue: '#f8f9fa',
      section: 'Grid',
    },

    // Input Styling
    inputBgColor: {
      label: {
        en: 'Input Background',
        pt: 'Fundo do Input',
      },
      type: 'Color',
      defaultValue: '#fff',
      section: 'Inputs',
    },
    inputTextColor: {
      label: {
        en: 'Input Text Color',
        pt: 'Cor do Texto do Input',
      },
      type: 'Color',
      defaultValue: '#333',
      section: 'Inputs',
    },
    inputBorderColor: {
      label: {
        en: 'Input Border Color',
        pt: 'Cor da Borda do Input',
      },
      type: 'Color',
      defaultValue: '#ddd',
      section: 'Inputs',
    },
    buttonBgColor: {
      label: {
        en: 'Button Background',
        pt: 'Fundo do Botão',
      },
      type: 'Color',
      defaultValue: '#f5f5f5',
      section: 'Inputs',
    },
    buttonTextColor: {
      label: {
        en: 'Button Text Color',
        pt: 'Cor do Texto do Botão',
      },
      type: 'Color',
      defaultValue: '#555',
      section: 'Inputs',
    },

    // Header
    headerBgColor: {
      label: {
        en: 'Header Background',
        pt: 'Fundo do Cabeçalho',
      },
      type: 'Color',
      defaultValue: '#FFFFFF',
      section: 'Header',
    },
    titleSize: {
      label: {
        en: 'Title Size',
        pt: 'Tamanho do Título',
      },
      type: 'Text',
      defaultValue: '1.4rem',
      section: 'Header',
    },

    // Global Style Properties
    backgroundColor: {
      label: {
        en: 'Background Color',
        pt: 'Cor de Fundo',
      },
      type: 'Color',
      defaultValue: '#ffffff',
      section: 'Style',
    },
    textColor: {
      label: {
        en: 'Text Color',
        pt: 'Cor do Texto',
      },
      type: 'Color',
      defaultValue: '#333',
      section: 'Style',
    },
    titleColor: {
      label: {
        en: 'Title Color',
        pt: 'Cor do Título',
      },
      type: 'Color',
      defaultValue: '#333',
      section: 'Style',
    },
    secondaryTextColor: {
      label: {
        en: 'Secondary Text Color',
        pt: 'Cor do Texto Secundário',
      },
      type: 'Color',
      defaultValue: '#666',
      section: 'Style',
    },
    borderColor: {
      label: {
        en: 'Border Color',
        pt: 'Cor da Borda',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      section: 'Style',
    },
    dividerColor: {
      label: {
        en: 'Divider Color',
        pt: 'Cor do Divisor',
      },
      type: 'Color',
      defaultValue: '#eaeaea',
      section: 'Style',
    },
    fontFamily: {
      label: {
        en: 'Font Family',
        pt: 'Família de Fonte',
      },
      type: 'Text',
      defaultValue: 'Inter, system-ui, sans-serif',
      section: 'Style',
    },
    borderRadius: {
      label: {
        en: 'Border Radius',
        pt: 'Raio da Borda',
      },
      type: 'Text',
      defaultValue: '16px',
      section: 'Style',
    },
    showShadow: {
      label: {
        en: 'Show Shadow',
        pt: 'Mostrar Sombra',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Style',
    },
    shadowStyle: {
      label: {
        en: 'Shadow Style',
        pt: 'Estilo da Sombra',
      },
      type: 'Text',
      defaultValue: '0 8px 30px rgba(0,0,0,0.12)',
      section: 'Style',
    },
    showBorder: {
      label: {
        en: 'Show Border',
        pt: 'Mostrar Borda',
      },
      type: 'OnOff',
      defaultValue: true,
      section: 'Style',
    },
  },

  // Event triggers definition
  triggerEvents: [
    {
      name: 'scheduleChanged',
      label: {
        en: 'On Schedule Changed',
        pt: 'Ao Alterar a Agenda',
      },
      event: {
        filledCells: 'array',
        studyHours: 'number',
        weeklyHoursGoal: 'number',
        weeklyProgressPercentage: 'number',
      },
    },
  ],

  // Getters
  getters: {
    scheduleData: {
      label: {
        en: 'Schedule Data',
        pt: 'Dados da Agenda',
      },
      description: {
        en: 'Returns the current schedule data',
        pt: 'Retorna os dados atuais da agenda',
      },
      getter: 'return this.getScheduleData();',
    },
    studyHours: {
      label: {
        en: 'Study Hours',
        pt: 'Horas de Estudo',
      },
      description: {
        en: 'Returns the current study hours count',
        pt: 'Retorna a contagem atual de horas de estudo',
      },
      getter: 'return this.studyHours;',
    },
  },

  // Actions
  actions: [
    {
      name: 'clearSchedule',
      label: {
        en: 'Clear Schedule',
        pt: 'Limpar Agenda',
      },
      action: `
this.clearSchedule();
`,
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
          required: true,
        },
      ],
      action: `
this.setCellValue(params.day, params.hour, params.type);
`,
    },
    {
      name: 'setWeeklyHoursGoal',
      label: {
        en: 'Set Weekly Hours Goal',
        pt: 'Definir Meta de Horas Semanais',
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
      action: `
this.setWeeklyHoursGoal(params.goal);
`,
    },
  ],
};

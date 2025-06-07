export type ViewMode = 'large' | 'medium' | 'mini' | 'list';

export interface ViewModeConfig {
  id: ViewMode;
  name: string;
  icon: string;
  gridClass: string;
  cardClass?: string;
}

export const VIEW_MODES: ViewModeConfig[] = [
  {
    id: 'large',
    name: 'Große Karten',
    icon: 'heroicons:squares-2x2-20-solid',
    gridClass:
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
  },
  {
    id: 'medium',
    name: 'Mittlere Karten',
    icon: 'heroicons:squares-plus-20-solid',
    gridClass:
      'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'
  },
  {
    id: 'mini',
    name: 'Mini Karten',
    icon: 'heroicons:view-columns-20-solid',
    gridClass:
      'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2',
    cardClass: 'compact'
  },
  {
    id: 'list',
    name: 'Listenmodus',
    icon: 'heroicons:bars-3-20-solid',
    gridClass: 'flex flex-col gap-2'
  }
];

// Globaler State für ViewMode (singleton pattern)
const globalViewMode = ref<ViewMode>('large');
let isInitialized = false;

export const useViewMode = () => {
  // Einmalige Initialisierung beim ersten Aufruf
  if (!isInitialized && process.client) {
    const saved = localStorage.getItem('nexus-view-mode');
    if (saved && VIEW_MODES.find(mode => mode.id === saved)) {
      globalViewMode.value = saved as ViewMode;
    }

    // Watch für localStorage-Persistierung
    watch(globalViewMode, newMode => {
      if (process.client) {
        localStorage.setItem('nexus-view-mode', newMode);
        console.log('ViewMode saved to localStorage:', newMode);
      }
    });

    isInitialized = true;
  }

  const setViewMode = (mode: ViewMode) => {
    console.log('Setting view mode to:', mode);
    globalViewMode.value = mode;
  };

  const getCurrentConfig = () => {
    return (
      VIEW_MODES.find(mode => mode.id === globalViewMode.value) || VIEW_MODES[0]
    );
  };

  return {
    currentViewMode: globalViewMode,
    setViewMode,
    getCurrentConfig,
    VIEW_MODES
  };
};

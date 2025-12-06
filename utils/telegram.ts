
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        backgroundColor?: string;
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
        }
      };
    };
  }
}

const tg = window.Telegram?.WebApp;

export const initTelegram = () => {
  if (tg) {
    tg.ready();
    tg.expand();
    
    // Ensure colors match
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor || tg.themeParams?.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams?.text_color || '#000000');
  }
};

export const hapticFeedback = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(style);
  }
};

export const notificationFeedback = (type: 'error' | 'success' | 'warning') => {
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.notificationOccurred(type);
  }
};

export const selectionFeedback = () => {
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.selectionChanged();
  }
};

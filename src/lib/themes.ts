/**
 * Multi-Theme Color System
 * Premium themes: Dark Neon, Pastel Gradient, Soft Glass, Minimal White, Cyber Blue
 */

export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    card: string;
  };
  gradients: {
    hero: string;
    section: string;
    card: string;
    accent: string;
  };
  effects: {
    glow: string;
    shadow: string;
    blur: string;
  };
}

export const themes: Record<string, Theme> = {
  darkNeon: {
    id: 'darkNeon',
    name: 'Dark Neon',
    colors: {
      background: 'hsl(240, 10%, 5%)',
      foreground: 'hsl(0, 0%, 100%)',
      primary: 'hsl(280, 100%, 70%)',
      secondary: 'hsl(320, 100%, 60%)',
      accent: 'hsl(180, 100%, 50%)',
      muted: 'hsl(240, 5%, 60%)',
      border: 'hsl(240, 10%, 15%)',
      card: 'hsl(240, 10%, 8%)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(280, 100%, 70%) 0%, hsl(320, 100%, 60%) 50%, hsl(180, 100%, 50%) 100%)',
      section: 'linear-gradient(180deg, hsl(240, 10%, 5%) 0%, hsl(280, 50%, 10%) 100%)',
      card: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(255, 20, 147, 0.1) 100%)',
      accent: 'linear-gradient(90deg, hsl(280, 100%, 70%), hsl(320, 100%, 60%), hsl(180, 100%, 50%))',
    },
    effects: {
      glow: '0 0 40px rgba(138, 43, 226, 0.6), 0 0 80px rgba(255, 20, 147, 0.4)',
      shadow: '0 20px 60px rgba(138, 43, 226, 0.3)',
      blur: 'blur(100px)',
    },
  },

  pastelGradient: {
    id: 'pastelGradient',
    name: 'Pastel Gradient',
    colors: {
      background: 'hsl(210, 40%, 98%)',
      foreground: 'hsl(220, 30%, 15%)',
      primary: 'hsl(340, 80%, 75%)',
      secondary: 'hsl(200, 70%, 70%)',
      accent: 'hsl(280, 70%, 75%)',
      muted: 'hsl(220, 20%, 45%)',
      border: 'hsl(210, 20%, 85%)',
      card: 'hsl(210, 40%, 99%)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(340, 80%, 85%) 0%, hsl(200, 70%, 80%) 50%, hsl(280, 70%, 85%) 100%)',
      section: 'linear-gradient(180deg, hsl(210, 40%, 98%) 0%, hsl(340, 60%, 95%) 100%)',
      card: 'linear-gradient(135deg, rgba(255, 182, 193, 0.3) 0%, rgba(173, 216, 230, 0.3) 100%)',
      accent: 'linear-gradient(90deg, hsl(340, 80%, 75%), hsl(200, 70%, 70%), hsl(280, 70%, 75%))',
    },
    effects: {
      glow: '0 0 30px rgba(255, 182, 193, 0.4)',
      shadow: '0 10px 40px rgba(173, 216, 230, 0.3)',
      blur: 'blur(80px)',
    },
  },

  softGlass: {
    id: 'softGlass',
    name: 'Soft Glass',
    colors: {
      background: 'hsl(210, 20%, 12%)',
      foreground: 'hsl(210, 20%, 100%)',
      primary: 'hsl(210, 80%, 60%)',
      secondary: 'hsl(190, 70%, 55%)',
      accent: 'hsl(200, 90%, 65%)',
      muted: 'hsl(210, 15%, 70%)',
      border: 'hsl(210, 20%, 20%)',
      card: 'rgba(255, 255, 255, 0.05)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(210, 80%, 60%) 0%, hsl(190, 70%, 55%) 50%, hsl(200, 90%, 65%) 100%)',
      section: 'linear-gradient(180deg, hsl(210, 20%, 12%) 0%, hsl(210, 30%, 15%) 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      accent: 'linear-gradient(90deg, hsl(210, 80%, 60%), hsl(190, 70%, 55%))',
    },
    effects: {
      glow: '0 0 50px rgba(100, 200, 255, 0.5)',
      shadow: '0 20px 60px rgba(100, 200, 255, 0.2)',
      blur: 'blur(60px)',
    },
  },

  minimalWhite: {
    id: 'minimalWhite',
    name: 'Minimal White',
    colors: {
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 10%)',
      primary: 'hsl(0, 0%, 20%)',
      secondary: 'hsl(0, 0%, 40%)',
      accent: 'hsl(0, 0%, 15%)',
      muted: 'hsl(0, 0%, 95%)',
      border: 'hsl(0, 0%, 90%)',
      card: 'hsl(0, 0%, 99%)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(0, 0%, 98%) 0%, hsl(0, 0%, 100%) 100%)',
      section: 'linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(0, 0%, 97%) 100%)',
      card: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)',
      accent: 'linear-gradient(90deg, hsl(0, 0%, 20%), hsl(0, 0%, 40%))',
    },
    effects: {
      glow: '0 0 20px rgba(0, 0, 0, 0.1)',
      shadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
      blur: 'blur(40px)',
    },
  },

  cyberBlue: {
    id: 'cyberBlue',
    name: 'Cyber Blue',
    colors: {
      background: 'hsl(220, 40%, 8%)',
      foreground: 'hsl(180, 100%, 98%)',
      primary: 'hsl(200, 100%, 50%)',
      secondary: 'hsl(280, 100%, 60%)',
      accent: 'hsl(160, 100%, 45%)',
      muted: 'hsl(180, 50%, 70%)',
      border: 'hsl(220, 40%, 12%)',
      card: 'hsl(220, 40%, 10%)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(280, 100%, 60%) 50%, hsl(160, 100%, 45%) 100%)',
      section: 'linear-gradient(180deg, hsl(220, 40%, 8%) 0%, hsl(200, 50%, 12%) 100%)',
      card: 'linear-gradient(135deg, rgba(0, 191, 255, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%)',
      accent: 'linear-gradient(90deg, hsl(200, 100%, 50%), hsl(280, 100%, 60%), hsl(160, 100%, 45%))',
    },
    effects: {
      glow: '0 0 40px rgba(0, 191, 255, 0.6), 0 0 80px rgba(138, 43, 226, 0.4)',
      shadow: '0 20px 60px rgba(0, 191, 255, 0.3)',
      blur: 'blur(100px)',
    },
  },

  vintage: {
    id: 'vintage',
    name: 'Vintage',
    colors: {
      background: 'hsl(35, 25%, 92%)',
      foreground: 'hsl(25, 35%, 15%)',
      primary: 'hsl(25, 35%, 20%)',
      secondary: 'hsl(35, 25%, 75%)',
      accent: 'hsl(18, 65%, 52%)',
      muted: 'hsl(25, 25%, 35%)',
      border: 'hsl(35, 20%, 80%)',
      card: 'hsl(40, 30%, 96%)',
    },
    gradients: {
      hero: 'linear-gradient(135deg, hsl(30, 25%, 65%), hsl(35, 20%, 55%))',
      section: 'linear-gradient(180deg, hsl(35, 25%, 92%), hsl(38, 28%, 88%))',
      card: 'linear-gradient(135deg, hsl(40, 30%, 96%), hsl(35, 25%, 90%))',
      accent: 'linear-gradient(90deg, hsl(18, 65%, 52%), hsl(20, 60%, 45%))',
    },
    effects: {
      glow: '0 0 30px rgba(214, 129, 79, 0.3)',
      shadow: '0 8px 32px rgba(25, 35, 20, 0.12)',
      blur: 'blur(60px)',
    },
  },
};

export const getTheme = (themeId: string): Theme => {
  return themes[themeId] || themes.vintage;
};


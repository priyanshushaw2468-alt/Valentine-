export enum AppState {
  ENTRY = 'ENTRY',
  PRANK = 'PRANK',
  SUCCESS = 'SUCCESS',
}

export type AnimationStyle = 
  | 'classic' 
  | 'teleport' 
  | 'spin' 
  | 'shrink' 
  | 'multiply' 
  | 'gravity' 
  | 'magnetic' 
  | 'invisibility';

export interface AnimationStage {
  attempts: number;
  scale: number;
  tooltip: string;
  text: string;
}

export const NO_BUTTON_STAGES: AnimationStage[] = [
  { attempts: 0, scale: 1, tooltip: "", text: "No" },
  { attempts: 1, scale: 1, tooltip: "Are you sure?", text: "Really?" },
  { attempts: 2, scale: 1, tooltip: "Really?", text: "Are you sure?" },
  { attempts: 3, scale: 0.9, tooltip: "Think again!", text: "Think again!" },
  { attempts: 4, scale: 0.9, tooltip: "Last chance!", text: "Last chance!" },
  { attempts: 5, scale: 0.8, tooltip: "Don't do this! 😢", text: "Have a heart!" },
  { attempts: 6, scale: 0.8, tooltip: "You're breaking my heart! 💔", text: "Don't!" },
  { attempts: 7, scale: 0.7, tooltip: "I'm gonna cry... 😭", text: "I'm crying" },
  { attempts: 8, scale: 0.6, tooltip: "PLEASE! 🙏", text: "Please?" },
  { attempts: 9, scale: 0.6, tooltip: "I'll do the dishes!", text: "Free food?" },
  { attempts: 10, scale: 0.5, tooltip: "Catch me if you can!", text: "Catch me!" },
];
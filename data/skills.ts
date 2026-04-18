export type Skill = {
  name: string;
  category: "visual" | "sound" | "performance" | "etc";
};

export const SKILLS: Skill[] = [
  { name: "TouchDesigner", category: "visual" },
  { name: "Resolume Arena", category: "visual" },
  { name: "Projection Mapping", category: "visual" },
  { name: "Generative Visual", category: "visual" },
  { name: "Ableton Live", category: "sound" },
  { name: "MAX/MSP", category: "sound" },
  { name: "Bitwig", category: "sound" },
  { name: "Pro Tools", category: "sound" },
  { name: "VCV Rack", category: "sound" },
  { name: "Hardware Synthesizers", category: "sound" },
  { name: "Drum Machine / Sequencer", category: "sound" },
  { name: "Sound Design", category: "sound" },
  { name: "Live A/V Performance", category: "performance" },
  { name: "Interactive Installation", category: "performance" },
  { name: "Audiovisual Performance", category: "performance" },
];

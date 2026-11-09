# QuizMaster – Interactive Quiz Application

QuizMaster is a modern, responsive, browser-based multiple-choice quiz platform built with **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🎨 Design & Color Palette

The interface features an **earthy modern tech aesthetic**:
- **Charcoal Black Foundation**: `#121316` base background, `#1B1D22` card containers, and `#22252D` surface insets.
- **Mud & Clay Earth Tones**: `#C4A482` warm clay bronze, `#A89078` muted mud, `#8C765E` deep clay, and `#D4B996` warm sand badges and borders.
- **Light Blue Accents**: `#38BDF8` sky blue highlights, `#7DD3FC` ice blue glowing orbs, `#E0F2FE` text touches, and dynamic circular progress stroke.
- **Evaluation Accents**: Soft mint emerald (`#34D399`) for correct answers and terracotta red (`#F87171`) for incorrect selections.

---

## 🌟 Key Features

- **Initial Welcome Screen**:
  - Branding with charcoal black, warm mud clay, and light blue accents.
  - Informational cards: 10 Questions, 60s Timer, Instant Feedback, and In-depth Analysis.
  - Category tags (JavaScript, React, CSS3, HTML5, Data Structures).
  - Scoring rules ribbon (`+1` correct, `0` incorrect, `-1` timeout penalty).
  - Prominent "Start Quiz" button.

- **Dynamic Quiz Interface**:
  - **Header**: Live score tracking (range: `-10` to `+10`), question counter, brand navigation, streak badge (`🔥 3 Streak!`), and sound toggle button.
  - **60-Second Countdown Timer**:
    - Animated light blue countdown ring and numerical seconds indicator.
    - Automatic urgency threshold alert (<15s) with pulsing warning state.
    - Automatic timeout handling (-1 pt, reveals correct answer, displays explanation, and triggers auto-advance).
  - **Animated Progress Bar**: Smooth light blue to mud gradient with percentage indicator.
  - **Question Cards**:
    - Categorized question badges and clear typography.
    - Four styled option buttons with letter indicators (A, B, C, D).
    - Immediate visual feedback on selection:
      - **Correct Answer**: Emerald green theme, checkmark icon, +1 point.
      - **Incorrect Answer**: Crimson red theme, error icon, highlights the correct answer in green.
    - Immediate explanation box providing learning context.
    - "Next Question" or "View Results" navigation.
  - **Keyboard Navigation**:
    - Press `A`, `B`, `C`, `D` or `1`, `2`, `3`, `4` to select options.
    - Press `Enter` or `Space` to advance to the next question or view results.

- **Synthesized Web Audio Effects**:
  - Pleasant harmonic chime on correct answer.
  - Low tone on incorrect answer.
  - Alarm chime on question timeout.
  - Click feedback on button navigation.
  - Full mute/unmute control accessible directly from the header.

- **Final Results Dashboard**:
  - **Performance Level Badges**:
    - `90% – 100%`: Excellent (with light blue & gold celebration confetti)
    - `70% – 89%`: Great Job
    - `50% – 69%`: Good Effort
    - `Below 50%`: Keep Practicing
  - **Animated Circular Score Gauge**: Dynamic SVG gradient circle reflecting final accuracy percentage.
  - **Topic Mastery Breakdown**: Visual progress bars showing strengths across categories.
  - **Statistics Grid**: Total questions, correct answers, incorrect answers, timed out count, accuracy %, and average response speed.
  - **Personal Best Persistence**: Highest score saved locally via `localStorage`.
  - **Share Score**: One-click copy results to clipboard to share with peers.
  - **Detailed Question Review**:
    - Full list of all 10 questions with response time for each.
    - Filters: All, Correct, Incorrect, Timed Out.
    - Comparison between user selection and correct answer.
    - Full explanation for every question.
  - **Reset Functionality**:
    - "Restart Quiz": Resets all scores, answers, and timers, restarting question 1.
    - "Back to Home": Returns to the welcome hero screen.

---

## 🛠️ Technology Stack

- **React 19**
- **JavaScript (ES6+)**
- **Tailwind CSS v4**
- **Framer Motion** (for smooth page transitions and micro-interactions)
- **Lucide React** (modern iconography)
- **canvas-confetti** (high-score celebratory effects)
- **Web Audio API** (synthesized sound effects with zero external media latency)
- **Vite 6** (fast build tool and dev server)

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

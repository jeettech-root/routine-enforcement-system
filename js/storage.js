// Centralized storage for tasks, logs, and streaks using localStorage

const Storage = (function () {
  const KEYS = {
    TASKS: "RES_TASKS_V1",
    STREAK: "RES_STREAK_V1",
  };

  function safeParse(json, fallback) {
    if (!json) return fallback;
    try {
      const value = JSON.parse(json);
      if (value && typeof value === "object") {
        return value;
      }
      return fallback;
    } catch (_e) {
      // corrupted data, return fallback
      return fallback;
    }
  }

  function loadTasks() {
    const raw = window.localStorage.getItem(KEYS.TASKS);
    const value = safeParse(raw, []);
    if (!Array.isArray(value)) return [];
    return value;
  }

  function saveTasks(tasks) {
    window.localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  }

  function loadStreak() {
    const raw = window.localStorage.getItem(KEYS.STREAK);
    const value = safeParse(raw, null);
    if (!value) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastDate: null,
      };
    }
    return {
      currentStreak: Number(value.currentStreak) || 0,
      longestStreak: Number(value.longestStreak) || 0,
      lastDate: typeof value.lastDate === "string" ? value.lastDate : null,
    };
  }

  function saveStreak(streak) {
    window.localStorage.setItem(KEYS.STREAK, JSON.stringify(streak));
  }

  return {
    loadTasks,
    saveTasks,
    loadStreak,
    saveStreak,
  };
})();



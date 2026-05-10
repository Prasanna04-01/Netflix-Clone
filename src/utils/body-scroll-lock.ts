const LOCK_COUNT_KEY = "scrollLockCount";
const ORIGINAL_OVERFLOW_KEY = "scrollLockOriginalOverflow";

const getBody = () => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.body;
};

export const lockBodyScroll = () => {
  const body = getBody();

  if (!body) {
    return;
  }

  const currentCount = Number.parseInt(body.dataset[LOCK_COUNT_KEY] ?? "0", 10) || 0;

  if (currentCount === 0) {
    body.dataset[ORIGINAL_OVERFLOW_KEY] = body.style.overflow;
    body.style.overflow = "hidden";
  }

  body.dataset[LOCK_COUNT_KEY] = String(currentCount + 1);
};

export const unlockBodyScroll = () => {
  const body = getBody();

  if (!body) {
    return;
  }

  const currentCount = Number.parseInt(body.dataset[LOCK_COUNT_KEY] ?? "0", 10) || 0;

  if (currentCount <= 1) {
    body.style.overflow = body.dataset[ORIGINAL_OVERFLOW_KEY] ?? "";
    delete body.dataset[LOCK_COUNT_KEY];
    delete body.dataset[ORIGINAL_OVERFLOW_KEY];
    return;
  }

  body.dataset[LOCK_COUNT_KEY] = String(currentCount - 1);
};

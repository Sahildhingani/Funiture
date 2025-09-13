function setItemWithExpiry(key, value, ttl) {
  const now = new Date();

  // `ttl` is time-to-live in milliseconds
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}
export default setItemWithExpiry;

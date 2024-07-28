function formatSlug(text) {
  return text.split(" ").join("-").toLowerCase();
}

export default formatSlug;

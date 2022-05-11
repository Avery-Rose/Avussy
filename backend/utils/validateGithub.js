function matchExact(regex, str) {
  if (!str) return false;
  let match = str.match(regex);
  return match && str == match[0];
}

const isValidGithub = (github) => {
  const reg = /https:\/\/github.com\/(\w*)\/(\w*)/i;
  return matchExact(reg, github);
};

module.exports = isValidGithub;

const presets = require('../presets-loader');

function presetsAction(player, values) {
  const value = decodeURIComponent(values[0]);
  let preset;
  if (value.startsWith('{')) {
    preset = JSON.parse(value);
  } else {
    preset = presets[value];
  }

  if (preset) {
    return player.system.applyPreset(preset);
  }

  const formattedPresets = Object.entries(presets).map(([key, data]) => ({
    key,
    label: key,
    ...data,
  }));
  return Promise.resolve(formattedPresets);
}

module.exports = api => {
  api.registerAction('preset', presetsAction);
};

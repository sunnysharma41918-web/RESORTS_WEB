const Setting = require('../models/Setting');

// @desc    Get site settings
// @route   GET /api/v1/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'global_site_settings' });

    if (!setting) {
      setting = await Setting.create({ key: 'global_site_settings' });
    }

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/v1/settings
// @access  Private/Admin
const updateSettings = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'global_site_settings' });

    if (!setting) {
      setting = await Setting.create({
        key: 'global_site_settings',
        ...req.body,
      });
    } else {
      if (req.body.siteConfig) {
        setting.siteConfig = { ...setting.siteConfig.toObject(), ...req.body.siteConfig };
      }
      if (req.body.contactInfo) {
        setting.contactInfo = { ...setting.contactInfo.toObject(), ...req.body.contactInfo };
      }
      await setting.save();
    }

    res.status(200).json({
      success: true,
      message: 'Global settings updated successfully',
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};

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
      if (req.body.tickerOffers !== undefined) {
        setting.tickerOffers = req.body.tickerOffers;
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

// @desc    Get ticker marquee announcements
// @route   GET /api/v1/settings/ticker
// @access  Public
const getTickerOffers = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'global_site_settings' });
    const ticker = setting?.tickerOffers || [];
    res.status(200).json({
      success: true,
      data: ticker,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticker marquee announcements
// @route   PUT /api/v1/settings/ticker
// @access  Private/Admin
const updateTickerOffers = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'global_site_settings' });
    const items = Array.isArray(req.body.items) ? req.body.items : Array.isArray(req.body) ? req.body : [];

    if (!setting) {
      setting = await Setting.create({
        key: 'global_site_settings',
        tickerOffers: items,
      });
    } else {
      setting.tickerOffers = items;
      await setting.save();
    }

    res.status(200).json({
      success: true,
      message: 'Marquee announcements updated successfully',
      data: setting.tickerOffers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getTickerOffers,
  updateTickerOffers,
};

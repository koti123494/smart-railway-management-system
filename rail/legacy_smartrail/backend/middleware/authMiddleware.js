// backend/middleware/authMiddleware.js

exports.verifyEsp32Auth = (req, res, next) => {
  const secretKey = process.env.ESP32_SECRET_KEY || 'smartrail_esp32_super_secret_key_2026';
  const providedSecret = req.headers['x-device-secret'] || req.query.secret;

  // In development, if no secret header is passed, allow with a log notice for seamless testing
  if (process.env.NODE_ENV === 'production') {
    if (!providedSecret || providedSecret !== secretKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or missing ESP32 device secret'
      });
    }
  }

  next();
};

exports.verifyAdminAuth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET_KEY || 'smartrail_admin_sih_2026';
  const providedSecret = req.headers['x-admin-key'] || req.query.adminKey;

  if (process.env.NODE_ENV === 'production') {
    if (!providedSecret || providedSecret !== adminSecret) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin credentials required'
      });
    }
  }

  next();
};

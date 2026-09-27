import { Request, Response, NextFunction } from 'express';

export function validateTrainNumber(req: Request, res: Response, next: NextFunction): void {
  const { trainNumber } = req.params;

  if (!trainNumber) {
    res.status(400).json({
      success: false,
      error: 'Invalid Request',
      message: 'Train number parameter is required.',
    });
    return;
  }

  const cleanNumber = trainNumber.trim();
  // Valid Indian train numbers are usually 4 or 5 digits (e.g. 12801, 22436, 04151)
  const isValid = /^\d{4,5}$/.test(cleanNumber);

  if (!isValid) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: `Invalid train number "${trainNumber}". Train numbers must be 4 or 5 digits.`,
    });
    return;
  }

  req.params.trainNumber = cleanNumber;
  next();
}

export function validateStationCode(req: Request, res: Response, next: NextFunction): void {
  const { code } = req.params;

  if (!code) {
    res.status(400).json({
      success: false,
      error: 'Invalid Request',
      message: 'Station code parameter is required.',
    });
    return;
  }

  const cleanCode = code.trim().toUpperCase();
  const isValid = /^[A-Z0-9]{2,6}$/.test(cleanCode);

  if (!isValid) {
    res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: `Invalid station code "${code}". Station codes must be 2 to 6 alphanumeric characters.`,
    });
    return;
  }

  req.params.code = cleanCode;
  next();
}

import { RailwayApiProvider } from './RailwayApiProvider.js';
import {
  TrainSearchResult,
  TrainSchedule,
  TrainLiveStatus,
  TrainLocation,
  StationBase,
  StationDetails,
  DashboardStats,
  TimelineStop,
  LocationType,
} from '../../types/railway.js';

// Master station directory with accurate geo-coordinates
export const MOCK_STATIONS: Record<string, StationBase> = {
  NDLS: { code: 'NDLS', name: 'New Delhi', state: 'Delhi', zone: 'NR', division: 'Delhi', coordinates: { latitude: 28.6430, longitude: 77.2195 } },
  NZM: { code: 'NZM', name: 'Hazrat Nizamuddin', state: 'Delhi', zone: 'NR', division: 'Delhi', coordinates: { latitude: 28.5888, longitude: 77.2533 } },
  MTJ: { code: 'MTJ', name: 'Mathura Junction', state: 'Uttar Pradesh', zone: 'NCR', division: 'Agra', coordinates: { latitude: 27.4924, longitude: 77.6737 } },
  AGC: { code: 'AGC', name: 'Agra Cantt', state: 'Uttar Pradesh', zone: 'NCR', division: 'Agra', coordinates: { latitude: 27.1592, longitude: 77.9892 } },
  GWL: { code: 'GWL', name: 'Gwalior Junction', state: 'Madhya Pradesh', zone: 'NCR', division: 'Jhansi', coordinates: { latitude: 26.2183, longitude: 78.1828 } },
  VGLJ: { code: 'VGLJ', name: 'VGL Jhansi Junction', state: 'Uttar Pradesh', zone: 'NCR', division: 'Jhansi', coordinates: { latitude: 25.4484, longitude: 78.5685 } },
  BPL: { code: 'BPL', name: 'Bhopal Junction', state: 'Madhya Pradesh', zone: 'WCR', division: 'Bhopal', coordinates: { latitude: 23.2689, longitude: 77.4126 } },
  RKMP: { code: 'RKMP', name: 'Rani Kamlapati', state: 'Madhya Pradesh', zone: 'WCR', division: 'Bhopal', coordinates: { latitude: 23.2065, longitude: 77.4385 } },
  ET: { code: 'ET', name: 'Itarsi Junction', state: 'Madhya Pradesh', zone: 'WCR', division: 'Bhopal', coordinates: { latitude: 22.6139, longitude: 77.7634 } },
  NGP: { code: 'NGP', name: 'Nagpur Junction', state: 'Maharashtra', zone: 'CR', division: 'Nagpur', coordinates: { latitude: 21.1524, longitude: 79.0888 } },
  BPQ: { code: 'BPQ', name: 'Balharshah Junction', state: 'Maharashtra', zone: 'CR', division: 'Nagpur', coordinates: { latitude: 19.8522, longitude: 79.3794 } },
  WL: { code: 'WL', name: 'Warangal', state: 'Telangana', zone: 'SCR', division: 'Secunderabad', coordinates: { latitude: 17.9689, longitude: 79.5941 } },
  KZJ: { code: 'KZJ', name: 'Kazipet Junction', state: 'Telangana', zone: 'SCR', division: 'Secunderabad', coordinates: { latitude: 17.9806, longitude: 79.5218 } },
  SC: { code: 'SC', name: 'Secunderabad Junction', state: 'Telangana', zone: 'SCR', division: 'Secunderabad', coordinates: { latitude: 17.4344, longitude: 78.5015 } },
  HYB: { code: 'HYB', name: 'Hyderabad Deccan', state: 'Telangana', zone: 'SCR', division: 'Hyderabad', coordinates: { latitude: 17.3916, longitude: 78.4667 } },
  BZA: { code: 'BZA', name: 'Vijayawada Junction', state: 'Andhra Pradesh', zone: 'SCR', division: 'Vijayawada', coordinates: { latitude: 16.5193, longitude: 80.6305 } },
  RJY: { code: 'RJY', name: 'Rajahmundry', state: 'Andhra Pradesh', zone: 'SCR', division: 'Vijayawada', coordinates: { latitude: 17.0005, longitude: 81.7800 } },
  VSKP: { code: 'VSKP', name: 'Visakhapatnam Junction', state: 'Andhra Pradesh', zone: 'ECoR', division: 'Waltair', coordinates: { latitude: 17.7215, longitude: 83.2872 } },
  KUR: { code: 'KUR', name: 'Khurda Road Junction', state: 'Odisha', zone: 'ECoR', division: 'Khurda Road', coordinates: { latitude: 20.1818, longitude: 85.7335 } },
  BBS: { code: 'BBS', name: 'Bhubaneswar', state: 'Odisha', zone: 'ECoR', division: 'Khurda Road', coordinates: { latitude: 20.2644, longitude: 85.8436 } },
  CTC: { code: 'CTC', name: 'Cuttack Junction', state: 'Odisha', zone: 'ECoR', division: 'Khurda Road', coordinates: { latitude: 20.4625, longitude: 85.8828 } },
  PURI: { code: 'PURI', name: 'Puri Terminus', state: 'Odisha', zone: 'ECoR', division: 'Khurda Road', coordinates: { latitude: 19.8135, longitude: 85.8312 } },
  KGP: { code: 'KGP', name: 'Kharagpur Junction', state: 'West Bengal', zone: 'SER', division: 'Kharagpur', coordinates: { latitude: 22.3392, longitude: 87.3256 } },
  TATA: { code: 'TATA', name: 'Tatanagar Junction', state: 'Jharkhand', zone: 'SER', division: 'Chakradharpur', coordinates: { latitude: 22.7667, longitude: 86.2029 } },
  BKSC: { code: 'BKSC', name: 'Bokaro Steel City', state: 'Jharkhand', zone: 'SER', division: 'Adra', coordinates: { latitude: 23.6693, longitude: 86.1511 } },
  GAYA: { code: 'GAYA', name: 'Gaya Junction', state: 'Bihar', zone: 'ECR', division: 'Pt Deen Dayal Upadhyaya', coordinates: { latitude: 24.8028, longitude: 84.9994 } },
  DDU: { code: 'DDU', name: 'Pt. Deen Dayal Upadhyaya Junction', state: 'Uttar Pradesh', zone: 'ECR', division: 'Pt Deen Dayal Upadhyaya', coordinates: { latitude: 25.2818, longitude: 83.1189 } },
  PRYJ: { code: 'PRYJ', name: 'Prayagraj Junction', state: 'Uttar Pradesh', zone: 'NCR', division: 'Prayagraj', coordinates: { latitude: 25.4431, longitude: 81.8252 } },
  CNB: { code: 'CNB', name: 'Kanpur Central', state: 'Uttar Pradesh', zone: 'NCR', division: 'Prayagraj', coordinates: { latitude: 26.4547, longitude: 80.3507 } },
  BSB: { code: 'BSB', name: 'Varanasi Junction', state: 'Uttar Pradesh', zone: 'NR', division: 'Lucknow NR', coordinates: { latitude: 25.3267, longitude: 82.9863 } },
  SBC: { code: 'SBC', name: 'KSR Bengaluru City', state: 'Karnataka', zone: 'SWR', division: 'Bengaluru', coordinates: { latitude: 12.9781, longitude: 77.5696 } },
  DMM: { code: 'DMM', name: 'Dharmavaram Junction', state: 'Andhra Pradesh', zone: 'SCR', division: 'Guntakal', coordinates: { latitude: 14.4144, longitude: 77.7212 } },
  GTL: { code: 'GTL', name: 'Guntakal Junction', state: 'Andhra Pradesh', zone: 'SCR', division: 'Guntakal', coordinates: { latitude: 15.1744, longitude: 77.3732 } },
  RC: { code: 'RC', name: 'Raichur Junction', state: 'Karnataka', zone: 'SCR', division: 'Guntakal', coordinates: { latitude: 16.2008, longitude: 77.3556 } },
  WADI: { code: 'WADI', name: 'Wadi Junction', state: 'Karnataka', zone: 'CR', division: 'Solapur', coordinates: { latitude: 17.0494, longitude: 76.9922 } },
  MMCT: { code: 'MMCT', name: 'Mumbai Central', state: 'Maharashtra', zone: 'WR', division: 'Mumbai WR', coordinates: { latitude: 18.9696, longitude: 72.8193 } },
  CSMT: { code: 'CSMT', name: 'Chhatrapati Shivaji Maharaj Terminus', state: 'Maharashtra', zone: 'CR', division: 'Mumbai CR', coordinates: { latitude: 18.9401, longitude: 72.8353 } },
  BVI: { code: 'BVI', name: 'Borivali', state: 'Maharashtra', zone: 'WR', division: 'Mumbai WR', coordinates: { latitude: 19.2291, longitude: 72.8573 } },
  ST: { code: 'ST', name: 'Surat', state: 'Gujarat', zone: 'WR', division: 'Mumbai WR', coordinates: { latitude: 21.2049, longitude: 72.8407 } },
  BRC: { code: 'BRC', name: 'Vadodara Junction', state: 'Gujarat', zone: 'WR', division: 'Vadodara', coordinates: { latitude: 22.3107, longitude: 73.1812 } },
  RTM: { code: 'RTM', name: 'Ratlam Junction', state: 'Madhya Pradesh', zone: 'WR', division: 'Ratlam', coordinates: { latitude: 23.3441, longitude: 75.0374 } },
  KOTA: { code: 'KOTA', name: 'Kota Junction', state: 'Rajasthan', zone: 'WCR', division: 'Kota', coordinates: { latitude: 25.2235, longitude: 75.8772 } },
  SWM: { code: 'SWM', name: 'Sawai Madhopur Junction', state: 'Rajasthan', zone: 'WCR', division: 'Kota', coordinates: { latitude: 25.9933, longitude: 76.3683 } },
  HWH: { code: 'HWH', name: 'Howrah Junction', state: 'West Bengal', zone: 'ER', division: 'Howrah', coordinates: { latitude: 22.5840, longitude: 88.3426 } },
  ASN: { code: 'ASN', name: 'Asansol Junction', state: 'West Bengal', zone: 'ER', division: 'Asansol', coordinates: { latitude: 23.6871, longitude: 86.9746 } },
  DHN: { code: 'DHN', name: 'Dhanbad Junction', state: 'Jharkhand', zone: 'ECR', division: 'Dhanbad', coordinates: { latitude: 23.7957, longitude: 86.4304 } },
  MAS: { code: 'MAS', name: 'MGR Chennai Central', state: 'Tamil Nadu', zone: 'SR', division: 'Chennai', coordinates: { latitude: 13.0827, longitude: 80.2755 } },
  TVC: { code: 'TVC', name: 'Thiruvananthapuram Central', state: 'Kerala', zone: 'SR', division: 'Thiruvananthapuram', coordinates: { latitude: 8.4875, longitude: 76.9525 } },
};

interface TrainRouteTemplate {
  trainNumber: string;
  trainName: string;
  trainType: string;
  sourceCode: string;
  destCode: string;
  runningDays: string[];
  departureTime: string;
  arrivalTime: string;
  classes: string[];
  currentStopIndex: number; // For simulation
  delayMinutes: number;
  stops: Array<{
    code: string;
    arr: string;
    dep: string;
    dist: number;
    day: number;
    platform: string;
    halt: number;
  }>;
}

const MOCK_TRAINS: TrainRouteTemplate[] = [
  {
    trainNumber: '12801',
    trainName: 'Purushottam Express',
    trainType: 'Superfast Express',
    sourceCode: 'PURI',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '21:55',
    arrivalTime: '04:00',
    classes: ['1A', '2A', '3A', 'SL', 'GEN'],
    currentStopIndex: 6, // At Gaya Junction
    delayMinutes: 18,
    stops: [
      { code: 'PURI', arr: 'START', dep: '21:55', dist: 0, day: 1, platform: '3', halt: 0 },
      { code: 'KUR', arr: '22:35', dep: '22:40', dist: 44, day: 1, platform: '2', halt: 5 },
      { code: 'BBS', arr: '23:00', dep: '23:05', dist: 63, day: 1, platform: '1', halt: 5 },
      { code: 'CTC', arr: '23:35', dep: '23:40', dist: 91, day: 1, platform: '1', halt: 5 },
      { code: 'KGP', arr: '03:45', dep: '03:55', dist: 385, day: 2, platform: '4', halt: 10 },
      { code: 'TATA', arr: '06:25', dep: '06:35', dist: 519, day: 2, platform: '3', halt: 10 },
      { code: 'BKSC', arr: '09:40', dep: '09:45', dist: 669, day: 2, platform: '1', halt: 5 },
      { code: 'GAYA', arr: '13:40', dep: '13:45', dist: 852, day: 2, platform: '1', halt: 5 },
      { code: 'DDU', arr: '16:50', dep: '17:00', dist: 1057, day: 2, platform: '2', halt: 10 },
      { code: 'PRYJ', arr: '19:20', dep: '19:30', dist: 1210, day: 2, platform: '1', halt: 10 },
      { code: 'CNB', arr: '21:55', dep: '22:05', dist: 1404, day: 2, platform: '2', halt: 10 },
      { code: 'NDLS', arr: '04:00', dep: 'END', dist: 1845, day: 3, platform: '12', halt: 0 },
    ],
  },
  {
    trainNumber: '12723',
    trainName: 'Telangana Express',
    trainType: 'Superfast Express',
    sourceCode: 'HYB',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '06:00',
    arrivalTime: '07:40',
    classes: ['1A', '2A', '3A', 'SL'],
    currentStopIndex: 4, // Nagpur
    delayMinutes: 24,
    stops: [
      { code: 'HYB', arr: 'START', dep: '06:00', dist: 0, day: 1, platform: '5', halt: 0 },
      { code: 'SC', arr: '06:20', dep: '06:25', dist: 10, day: 1, platform: '1', halt: 5 },
      { code: 'KZJ', arr: '08:03', dep: '08:05', dist: 141, day: 1, platform: '1', halt: 2 },
      { code: 'BPQ', arr: '11:55', dep: '12:00', dist: 377, day: 1, platform: '4', halt: 5 },
      { code: 'NGP', arr: '15:20', dep: '15:25', dist: 586, day: 1, platform: '1', halt: 5 },
      { code: 'BPL', arr: '21:45', dep: '21:55', dist: 975, day: 1, platform: '2', halt: 10 },
      { code: 'VGLJ', arr: '01:15', dep: '01:23', dist: 1267, day: 2, platform: '4', halt: 8 },
      { code: 'GWL', arr: '02:40', dep: '02:42', dist: 1364, day: 2, platform: '2', halt: 2 },
      { code: 'AGC', arr: '04:25', dep: '04:27', dist: 1482, day: 2, platform: '3', halt: 2 },
      { code: 'MTJ', arr: '05:03', dep: '05:05', dist: 1536, day: 2, platform: '2', halt: 2 },
      { code: 'NDLS', arr: '07:40', dep: 'END', dist: 1677, day: 2, platform: '9', halt: 0 },
    ],
  },
  {
    trainNumber: '12627',
    trainName: 'Karnataka Express',
    trainType: 'Superfast Express',
    sourceCode: 'SBC',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '19:20',
    arrivalTime: '09:00',
    classes: ['1A', '2A', '3A', 'SL'],
    currentStopIndex: 6, // Itarsi
    delayMinutes: 35,
    stops: [
      { code: 'SBC', arr: 'START', dep: '19:20', dist: 0, day: 1, platform: '1', halt: 0 },
      { code: 'DMM', arr: '22:48', dep: '22:50', dist: 175, day: 1, platform: '1', halt: 2 },
      { code: 'GTL', arr: '01:05', dep: '01:10', dist: 309, day: 2, platform: '2', halt: 5 },
      { code: 'RC', arr: '02:58', dep: '03:00', dist: 430, day: 2, platform: '2', halt: 2 },
      { code: 'WADI', arr: '04:55', dep: '05:00', dist: 538, day: 2, platform: '3', halt: 5 },
      { code: 'NGP', arr: '15:25', dep: '15:30', dist: 1300, day: 2, platform: '1', halt: 5 },
      { code: 'ET', arr: '20:10', dep: '20:20', dist: 1598, day: 2, platform: '1', halt: 10 },
      { code: 'BPL', arr: '21:50', dep: '22:00', dist: 1690, day: 2, platform: '2', halt: 10 },
      { code: 'VGLJ', arr: '02:10', dep: '02:18', dist: 1982, day: 3, platform: '4', halt: 8 },
      { code: 'GWL', arr: '03:33', dep: '03:35', dist: 2079, day: 3, platform: '2', halt: 2 },
      { code: 'AGC', arr: '05:45', dep: '05:50', dist: 2197, day: 3, platform: '3', halt: 5 },
      { code: 'NDLS', arr: '09:00', dep: 'END', dist: 2392, day: 3, platform: '3', halt: 0 },
    ],
  },
  {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    trainType: 'Rajdhani Express',
    sourceCode: 'MMCT',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '17:00',
    arrivalTime: '08:32',
    classes: ['1A', '2A', '3A'],
    currentStopIndex: 3, // Ratlam
    delayMinutes: 0, // On time!
    stops: [
      { code: 'MMCT', arr: 'START', dep: '17:00', dist: 0, day: 1, platform: '1', halt: 0 },
      { code: 'BVI', arr: '17:22', dep: '17:24', dist: 30, day: 1, platform: '6', halt: 2 },
      { code: 'ST', arr: '19:43', dep: '19:48', dist: 263, day: 1, platform: '1', halt: 5 },
      { code: 'BRC', arr: '21:06', dep: '21:16', dist: 393, day: 1, platform: '2', halt: 10 },
      { code: 'RTM', arr: '00:25', dep: '00:28', dist: 653, day: 2, platform: '5', halt: 3 },
      { code: 'KOTA', arr: '03:15', dep: '03:20', dist: 920, day: 2, platform: '1', halt: 5 },
      { code: 'NDLS', arr: '08:32', dep: 'END', dist: 1386, day: 2, platform: '2', halt: 0 },
    ],
  },
  {
    trainNumber: '22436',
    trainName: 'Vande Bharat Express',
    trainType: 'Vande Bharat',
    sourceCode: 'NDLS',
    destCode: 'BSB',
    runningDays: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    departureTime: '06:00',
    arrivalTime: '14:00',
    classes: ['EC', 'CC'],
    currentStopIndex: 1, // Kanpur
    delayMinutes: 5,
    stops: [
      { code: 'NDLS', arr: 'START', dep: '06:00', dist: 0, day: 1, platform: '16', halt: 0 },
      { code: 'CNB', arr: '10:08', dep: '10:10', dist: 441, day: 1, platform: '1', halt: 2 },
      { code: 'PRYJ', arr: '12:08', dep: '12:10', dist: 635, day: 1, platform: '6', halt: 2 },
      { code: 'BSB', arr: '14:00', dep: 'END', dist: 759, day: 1, platform: '1', halt: 0 },
    ],
  },
  {
    trainNumber: '12002',
    trainName: 'Bhopal Shatabdi Express',
    trainType: 'Shatabdi Express',
    sourceCode: 'NDLS',
    destCode: 'RKMP',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
    departureTime: '06:00',
    arrivalTime: '14:40',
    classes: ['EC', 'CC'],
    currentStopIndex: 3, // Gwalior
    delayMinutes: 12,
    stops: [
      { code: 'NDLS', arr: 'START', dep: '06:00', dist: 0, day: 1, platform: '1', halt: 0 },
      { code: 'MTJ', arr: '07:19', dep: '07:20', dist: 141, day: 1, platform: '1', halt: 1 },
      { code: 'AGC', arr: '07:50', dep: '07:55', dist: 195, day: 1, platform: '1', halt: 5 },
      { code: 'GWL', arr: '09:23', dep: '09:28', dist: 313, day: 1, platform: '1', halt: 5 },
      { code: 'VGLJ', arr: '10:45', dep: '10:50', dist: 410, day: 1, platform: '1', halt: 5 },
      { code: 'BPL', arr: '14:07', dep: '14:12', dist: 702, day: 1, platform: '1', halt: 5 },
      { code: 'RKMP', arr: '14:40', dep: 'END', dist: 708, day: 1, platform: '1', halt: 0 },
    ],
  },
  {
    trainNumber: '12301',
    trainName: 'Howrah Rajdhani Express',
    trainType: 'Rajdhani Express',
    sourceCode: 'HWH',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    departureTime: '16:50',
    arrivalTime: '10:05',
    classes: ['1A', '2A', '3A'],
    currentStopIndex: 4, // Pt Deen Dayal Upadhyaya
    delayMinutes: 8,
    stops: [
      { code: 'HWH', arr: 'START', dep: '16:50', dist: 0, day: 1, platform: '9', halt: 0 },
      { code: 'ASN', arr: '18:57', dep: '19:00', dist: 200, day: 1, platform: '4', halt: 3 },
      { code: 'DHN', arr: '19:50', dep: '19:55', dist: 259, day: 1, platform: '3', halt: 5 },
      { code: 'GAYA', arr: '22:19', dep: '22:22', dist: 459, day: 1, platform: '1', halt: 3 },
      { code: 'DDU', arr: '00:45', dep: '00:55', dist: 664, day: 2, platform: '4', halt: 10 },
      { code: 'PRYJ', arr: '02:43', dep: '02:45', dist: 817, day: 2, platform: '1', halt: 2 },
      { code: 'CNB', arr: '04:40', dep: '04:45', dist: 1011, day: 2, platform: '1', halt: 5 },
      { code: 'NDLS', arr: '10:05', dep: 'END', dist: 1451, day: 2, platform: '13', halt: 0 },
    ],
  },
  {
    trainNumber: '12626',
    trainName: 'Kerala Express',
    trainType: 'Superfast Express',
    sourceCode: 'NDLS',
    destCode: 'TVC',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '20:10',
    arrivalTime: '14:15',
    classes: ['2A', '3A', 'SL'],
    currentStopIndex: 5, // Vijayawada
    delayMinutes: 45,
    stops: [
      { code: 'NDLS', arr: 'START', dep: '20:10', dist: 0, day: 1, platform: '3', halt: 0 },
      { code: 'MTJ', arr: '21:38', dep: '21:40', dist: 141, day: 1, platform: '1', halt: 2 },
      { code: 'AGC', arr: '22:20', dep: '22:25', dist: 195, day: 1, platform: '1', halt: 5 },
      { code: 'GWL', arr: '23:43', dep: '23:45', dist: 313, day: 1, platform: '1', halt: 2 },
      { code: 'BPL', arr: '05:20', dep: '05:30', dist: 702, day: 2, platform: '1', halt: 10 },
      { code: 'NGP', arr: '11:45', dep: '11:50', dist: 1090, day: 2, platform: '2', halt: 5 },
      { code: 'BPQ', arr: '15:15', dep: '15:20', dist: 1299, day: 2, platform: '1', halt: 5 },
      { code: 'WL', arr: '18:50', dep: '18:55', dist: 1542, day: 2, platform: '1', halt: 5 },
      { code: 'BZA', arr: '22:20', dep: '22:30', dist: 1749, day: 2, platform: '6', halt: 10 },
      { code: 'TVC', arr: '14:15', dep: 'END', dist: 3036, day: 4, platform: '1', halt: 0 },
    ],
  },
  {
    trainNumber: '12137',
    trainName: 'Punjab Mail',
    trainType: 'Superfast Express',
    sourceCode: 'CSMT',
    destCode: 'NDLS',
    runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    departureTime: '19:35',
    arrivalTime: '21:30',
    classes: ['1A', '2A', '3A', 'SL'],
    currentStopIndex: 4, // Bhopal
    delayMinutes: 0,
    stops: [
      { code: 'CSMT', arr: 'START', dep: '19:35', dist: 0, day: 1, platform: '18', halt: 0 },
      { code: 'ET', arr: '07:35', dep: '07:45', dist: 747, day: 2, platform: '3', halt: 10 },
      { code: 'BPL', arr: '09:30', dep: '09:35', dist: 839, day: 2, platform: '2', halt: 5 },
      { code: 'VGLJ', arr: '14:15', dep: '14:23', dist: 1131, day: 2, platform: '4', halt: 8 },
      { code: 'GWL', arr: '15:40', dep: '15:42', dist: 1228, day: 2, platform: '2', halt: 2 },
      { code: 'AGC', arr: '17:50', dep: '17:55', dist: 1346, day: 2, platform: '2', halt: 5 },
      { code: 'NDLS', arr: '21:30', dep: 'END', dist: 1541, day: 2, platform: '5', halt: 0 },
    ],
  },
  {
    trainNumber: '12431',
    trainName: 'Thiruvananthapuram Rajdhani',
    trainType: 'Rajdhani Express',
    sourceCode: 'TVC',
    destCode: 'NZM',
    runningDays: ['Tue', 'Thu', 'Fri'],
    departureTime: '19:15',
    arrivalTime: '12:30',
    classes: ['1A', '2A', '3A'],
    currentStopIndex: 3, // Vadodara
    delayMinutes: 15,
    stops: [
      { code: 'TVC', arr: 'START', dep: '19:15', dist: 0, day: 1, platform: '1', halt: 0 },
      { code: 'ST', arr: '19:50', dep: '19:55', dist: 1980, day: 2, platform: '1', halt: 5 },
      { code: 'BRC', arr: '21:35', dep: '21:45', dist: 2110, day: 2, platform: '2', halt: 10 },
      { code: 'RTM', arr: '01:25', dep: '01:28', dist: 2370, day: 3, platform: '4', halt: 3 },
      { code: 'KOTA', arr: '04:40', dep: '04:45', dist: 2636, day: 3, platform: '1', halt: 5 },
      { code: 'NZM', arr: '12:30', dep: 'END', dist: 3144, day: 3, platform: '7', halt: 0 },
    ],
  },
];

export class MockRailwayProvider implements RailwayApiProvider {
  readonly providerName = 'MockRailwayProvider';

  private buildTimelineStops(train: TrainRouteTemplate): TimelineStop[] {
    const totalStops = train.stops.length;
    return train.stops.map((stop, idx) => {
      const station = MOCK_STATIONS[stop.code] || {
        code: stop.code,
        name: stop.code,
        state: 'India',
        coordinates: { latitude: 20.0, longitude: 78.0 },
      };

      let stopStatus: TimelineStop['status'] = 'UPCOMING';
      let delayArrival = 0;
      let delayDeparture = 0;

      if (idx < train.currentStopIndex) {
        stopStatus = 'COMPLETED';
        delayArrival = Math.max(0, Math.floor(train.delayMinutes * 0.7));
        delayDeparture = Math.max(0, Math.floor(train.delayMinutes * 0.8));
      } else if (idx === train.currentStopIndex) {
        stopStatus = 'CURRENT';
        delayArrival = train.delayMinutes;
        delayDeparture = train.delayMinutes;
      } else {
        stopStatus = 'UPCOMING';
        // Projected delay fades or carries forward
        delayArrival = train.delayMinutes;
        delayDeparture = train.delayMinutes;
      }

      return {
        stopNumber: idx + 1,
        station,
        scheduledArrival: stop.arr,
        scheduledDeparture: stop.dep,
        actualArrival: idx <= train.currentStopIndex ? this.addMinutesToTime(stop.arr, delayArrival) : undefined,
        actualDeparture: idx < train.currentStopIndex ? this.addMinutesToTime(stop.dep, delayDeparture) : undefined,
        estimatedArrival: idx >= train.currentStopIndex ? this.addMinutesToTime(stop.arr, delayArrival) : undefined,
        estimatedDeparture: idx >= train.currentStopIndex ? this.addMinutesToTime(stop.dep, delayDeparture) : undefined,
        delayArrivalMinutes: delayArrival,
        delayDepartureMinutes: delayDeparture,
        status: stopStatus,
        distanceKm: stop.dist,
        dayCount: stop.day,
        platform: stop.platform,
        haltMinutes: stop.halt,
      };
    });
  }

  private addMinutesToTime(timeStr: string, minutesToAdd: number): string {
    if (!timeStr || timeStr === 'START' || timeStr === 'END') return timeStr;
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(minutes)) return timeStr;

    const totalMinutes = (hours * 60 + minutes + minutesToAdd) % (24 * 60);
    const positiveMinutes = totalMinutes < 0 ? totalMinutes + 24 * 60 : totalMinutes;
    const h = Math.floor(positiveMinutes / 60).toString().padStart(2, '0');
    const m = (positiveMinutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  async searchTrains(query: string): Promise<TrainSearchResult[]> {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return MOCK_TRAINS.map((t) => this.toSearchResult(t));
    }

    const matches = MOCK_TRAINS.filter((t) => {
      const source = MOCK_STATIONS[t.sourceCode];
      const dest = MOCK_STATIONS[t.destCode];
      return (
        t.trainNumber.includes(q) ||
        t.trainName.toLowerCase().includes(q) ||
        t.sourceCode.toLowerCase().includes(q) ||
        t.destCode.toLowerCase().includes(q) ||
        (source && source.name.toLowerCase().includes(q)) ||
        (dest && dest.name.toLowerCase().includes(q))
      );
    });

    return matches.map((t) => this.toSearchResult(t));
  }

  private toSearchResult(t: TrainRouteTemplate): TrainSearchResult {
    const source = MOCK_STATIONS[t.sourceCode] || { code: t.sourceCode, name: t.sourceCode, state: '', coordinates: { latitude: 0, longitude: 0 } };
    const dest = MOCK_STATIONS[t.destCode] || { code: t.destCode, name: t.destCode, state: '', coordinates: { latitude: 0, longitude: 0 } };
    const lastStop = t.stops[t.stops.length - 1];

    let currentStatus: TrainSearchResult['currentStatus'] = 'RUNNING';
    if (t.delayMinutes > 15) {
      currentStatus = 'DELAYED';
    } else if (t.currentStopIndex >= t.stops.length - 1) {
      currentStatus = 'COMPLETED';
    }

    return {
      trainNumber: t.trainNumber,
      trainName: t.trainName,
      trainType: t.trainType,
      source: { code: source.code, name: source.name },
      destination: { code: dest.code, name: dest.name },
      departureTime: t.departureTime,
      arrivalTime: t.arrivalTime,
      runningDays: t.runningDays,
      currentStatus,
      delayMinutes: t.delayMinutes,
      distanceKm: lastStop.dist,
    };
  }

  async getTrainSchedule(trainNumber: string): Promise<TrainSchedule | null> {
    const train = MOCK_TRAINS.find((t) => t.trainNumber === trainNumber);
    if (!train) return null;

    const source = MOCK_STATIONS[train.sourceCode];
    const destination = MOCK_STATIONS[train.destCode];
    const stops = this.buildTimelineStops(train);
    const lastStop = train.stops[train.stops.length - 1];

    return {
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      trainType: train.trainType,
      source,
      destination,
      totalDistanceKm: lastStop.dist,
      runningDays: train.runningDays,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      totalTravelTime: '26 hrs 05 mins',
      classes: train.classes,
      stops,
      lastUpdated: new Date().toISOString(),
    };
  }

  async getTrainStatus(trainNumber: string): Promise<TrainLiveStatus | null> {
    const train = MOCK_TRAINS.find((t) => t.trainNumber === trainNumber);
    if (!train) return null;

    const source = MOCK_STATIONS[train.sourceCode];
    const destination = MOCK_STATIONS[train.destCode];
    const timeline = this.buildTimelineStops(train);
    const currentStopTemplate = train.stops[train.currentStopIndex];
    const currentStationBase = MOCK_STATIONS[currentStopTemplate.code];

    const nextStopTemplate =
      train.currentStopIndex < train.stops.length - 1
        ? train.stops[train.currentStopIndex + 1]
        : undefined;
    const nextStationBase = nextStopTemplate ? MOCK_STATIONS[nextStopTemplate.code] : undefined;

    const lastStop = train.stops[train.stops.length - 1];
    const distanceTravelled = currentStopTemplate.dist;
    const progress = Math.min(100, Math.round((distanceTravelled / lastStop.dist) * 100));

    let status: TrainLiveStatus['status'] = 'RUNNING';
    if (train.delayMinutes > 15) {
      status = 'DELAYED';
    } else if (train.currentStopIndex === 0 && train.delayMinutes === 0) {
      status = 'NOT_STARTED';
    } else if (train.currentStopIndex >= train.stops.length - 1) {
      status = 'COMPLETED';
    }

    // ACCURACY REQUIREMENT: Never claim Live GPS when not equipped with real GPS hardware telemetry.
    const locationType: LocationType = 'LAST_REPORTED_STATION';
    const dataAccuracyNote =
      'Live GPS location is unavailable from railway telemetry. Showing the train’s latest reported station.';

    return {
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      trainType: train.trainType,
      source,
      destination,
      status,
      delayMinutes: train.delayMinutes,
      locationType,
      currentStation: {
        code: currentStationBase.code,
        name: currentStationBase.name,
        coordinates: currentStationBase.coordinates,
        platform: currentStopTemplate.platform,
        haltMinutes: currentStopTemplate.halt,
      },
      nextStation: nextStationBase && nextStopTemplate
        ? {
            code: nextStationBase.code,
            name: nextStationBase.name,
            coordinates: nextStationBase.coordinates,
            distanceKm: nextStopTemplate.dist - currentStopTemplate.dist,
            scheduledArrival: nextStopTemplate.arr,
            estimatedArrival: this.addMinutesToTime(nextStopTemplate.arr, train.delayMinutes),
          }
        : undefined,
      lastReportedStation: {
        code: currentStationBase.code,
        name: currentStationBase.name,
        coordinates: currentStationBase.coordinates,
        reportedTime: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      speedKmH: status === 'RUNNING' || status === 'DELAYED' ? 78 : 0,
      distanceTravelledKm: distanceTravelled,
      totalDistanceKm: lastStop.dist,
      progressPercentage: progress,
      lastUpdated: new Date().toISOString(),
      dataAccuracyNote,
      timeline,
    };
  }

  async getTrainLocation(trainNumber: string): Promise<TrainLocation | null> {
    const liveStatus = await this.getTrainStatus(trainNumber);
    if (!liveStatus) return null;

    return {
      trainNumber: liveStatus.trainNumber,
      trainName: liveStatus.trainName,
      locationType: liveStatus.locationType,
      reportedLocation: {
        stationName: liveStatus.currentStation.name,
        stationCode: liveStatus.currentStation.code,
        coordinates: liveStatus.currentStation.coordinates,
        distanceFromOriginKm: liveStatus.distanceTravelledKm,
        platform: liveStatus.currentStation.platform,
      },
      hasGps: false,
      speedKmH: liveStatus.speedKmH,
      lastUpdated: liveStatus.lastUpdated,
      statusMessage: `${liveStatus.trainNumber} ${liveStatus.trainName} is currently reported at ${liveStatus.currentStation.name} with a delay of ${liveStatus.delayMinutes} minutes.`,
      dataAccuracyNote: liveStatus.dataAccuracyNote,
    };
  }

  async searchStations(query: string): Promise<StationBase[]> {
    const q = (query || '').trim().toLowerCase();
    const stations = Object.values(MOCK_STATIONS);
    if (!q) return stations.slice(0, 15);

    return stations.filter(
      (s) =>
        s.code.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q)
    );
  }

  async getStationDetails(code: string): Promise<StationDetails | null> {
    const stationCode = (code || '').trim().toUpperCase();
    const station = MOCK_STATIONS[stationCode];
    if (!station) return null;

    // Find trains passing through this station
    const passingTrains: StationDetails['passingTrains'] = [];
    for (const train of MOCK_TRAINS) {
      const stop = train.stops.find((s) => s.code === stationCode);
      if (stop) {
        const src = MOCK_STATIONS[train.sourceCode]?.name || train.sourceCode;
        const dst = MOCK_STATIONS[train.destCode]?.name || train.destCode;
        passingTrains.push({
          trainNumber: train.trainNumber,
          trainName: train.trainName,
          arrivalTime: stop.arr,
          departureTime: stop.dep,
          source: src,
          destination: dst,
          platform: stop.platform,
        });
      }
    }

    return {
      ...station,
      platforms: 8,
      passingTrainsCount: passingTrains.length,
      passingTrains,
    };
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const all = MOCK_TRAINS.map((t) => this.toSearchResult(t));
    const running = all.filter((t) => t.currentStatus === 'RUNNING').length;
    const delayed = all.filter((t) => t.currentStatus === 'DELAYED').length;
    const cancelled = all.filter((t) => t.currentStatus === 'CANCELLED').length;
    const completed = all.filter((t) => t.currentStatus === 'COMPLETED').length;

    return {
      trackedTrainsCount: all.length,
      runningCount: running,
      delayedCount: delayed,
      cancelledCount: cancelled,
      completedCount: completed,
      lastUpdated: new Date().toISOString(),
      popularTrains: all.slice(0, 5),
    };
  }
}

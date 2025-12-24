# Project Structure Documentation

## Overview
โครงสร้างโปรเจกต์แบ่งออกเป็น 3 ส่วนหลัก: **Pages**, **Routes**, และ **APIs**

## Folder Structure

```
src/
├── pages/              # Page-level components (ใช้สำหรับหน้าต่าง ๆ)
│   ├── LandingPage.tsx
│   ├── ImageDetectorPage.tsx
│   ├── VideoDetectorPage.tsx
│   ├── TextDetectorPage.tsx
│   ├── EmailDetectorPage.tsx
│   ├── ChromeExtensionPage.tsx
│   ├── HistoryPage.tsx
│   ├── CommunityPage.tsx
│   ├── AuthPage.tsx
│   └── index.ts
│
├── routes/             # Route configuration and navigation
│   ├── routeConfig.ts  # Route definitions
│   ├── useNavigation.ts # Navigation hook
│   └── index.ts
│
├── api/                # API services and endpoints
│   ├── client.ts          # Base API client
│   ├── endpoints.ts       # API endpoints (deprecated - use services)
│   ├── detectionService.ts # Image, Video, Text, Email detection
│   ├── historyService.ts  # History management
│   ├── communityService.ts # Community features
│   ├── authService.ts     # Authentication
│   └── index.ts
│
├── components/         # Reusable UI components (ไม่มีการเปลี่ยนแปลง)
├── context/            # React Context providers (ไม่มีการเปลี่ยนแปลง)
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Usage Examples

### ใช้งาน Pages
```tsx
import { ImageDetectorPage, VideoDetectorPage } from '@/pages';

// ใช้ใน App.tsx
function App() {
  const [activeTab, setActiveTab] = useState('image');
  
  return (
    <>
      {activeTab === 'image' && <ImageDetectorPage />}
      {activeTab === 'video' && <VideoDetectorPage />}
    </>
  );
}
```

### ใช้งาน Routes
```tsx
import { routes, getRouteByTab } from '@/routes';

// ทุกหน้า route
routes.forEach(route => {
  console.log(route.label, route.path);
});

// หา route ตามชื่อ
const imageRoute = getRouteByTab('image');
```

### ใช้งาน API Services
```tsx
import { 
  imageDetectionService, 
  historyService, 
  authService 
} from '@/api';

// ใช้ detection service
const result = await imageDetectionService.analyzeImage(file);

// ใช้ history service
const history = await historyService.getHistory();

// ใช้ auth service
const user = await authService.getCurrentUser();
```

### ใช้งาน API Client
```tsx
import { apiClient } from '@/api';

// GET request
const data = await apiClient.get('/endpoint');

// POST request
const response = await apiClient.post('/endpoint', { key: 'value' });

// PUT request
const updated = await apiClient.put('/endpoint', { key: 'newValue' });

// DELETE request
await apiClient.delete('/endpoint');
```

## API Services

### Detection Service
- `imageDetectionService.analyzeImage(imageFile)` - วิเคราะห์รูปภาพ
- `videoDetectionService.analyzeVideo(videoFile)` - วิเคราะห์วิดีโอ
- `textDetectionService.analyzeText(text)` - วิเคราะห์ข้อความ
- `emailDetectionService.analyzeEmail(email)` - วิเคราะห์อีเมล

### History Service
- `historyService.getHistory()` - ดึงประวัติ
- `historyService.addHistoryItem(item)` - เพิ่มรายการประวัติ
- `historyService.deleteHistoryItem(id)` - ลบรายการประวัติ
- `historyService.clearHistory()` - ล้างประวัติทั้งหมด

### Community Service
- `communityService.getPosts()` - ดึงโพสต์จากคอมมิวนิตี้
- `communityService.createPost(data)` - สร้างโพสต์ใหม่
- `communityService.likePost(postId)` - ให้ไลค์โพสต์
- `communityService.deletePost(postId)` - ลบโพสต์

### Auth Service
- `authService.login(email, password)` - เข้าสู่ระบบ
- `authService.register(username, email, password)` - ลงทะเบียน
- `authService.logout()` - ออกจากระบบ
- `authService.getCurrentUser()` - ดึงข้อมูลผู้ใช้ปัจจุบัน
- `authService.updateProfile(data)` - อัปเดตโปรไฟล์

## Next Steps

1. **Update App.tsx** - ใช้ pages และ routes ใหม่
2. **Replace API calls** - แทนที่การเรียก API เดิมด้วย services ใหม่
3. **Configure API_BASE_URL** - ตั้งค่า URL ของ API server ใน `.env`
4. **Test all features** - ทดสอบการทำงานของทุก features

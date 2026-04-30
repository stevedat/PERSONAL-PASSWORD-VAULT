import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { get } from "svelte/store";
import { language } from "./language";
import { Dialog } from "./dialogStore";

export function startTour() {
  const isVi = get(language) === "vi";

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    nextBtnText: isVi ? 'Tiếp' : 'Next',
    prevBtnText: isVi ? 'Lùi' : 'Previous',
    doneBtnText: isVi ? 'Hoàn thành' : 'Done',
    steps: [
      {
        element: '#tour-header',
        popover: {
          title: isVi ? 'Chào mừng đến với PocketVault' : 'Welcome to PocketVault',
          description: isVi ? 'Đây là ứng dụng quản lý mật khẩu cá nhân an toàn của bạn. Hãy cùng xem qua các tính năng chính nhé!' : 'This is your secure personal password manager. Let\'s take a quick tour of the main features!',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#tour-add-btn',
        popover: {
          title: isVi ? 'Thêm Mật khẩu mới' : 'Add New Password',
          description: isVi ? 'Nhấn vào đây để thêm tài khoản đăng nhập, thẻ ngân hàng, ghi chú bảo mật...' : 'Click here to add a new login, bank card, or secure note...',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#tour-search-bar',
        popover: {
          title: isVi ? 'Tìm kiếm' : 'Search',
          description: isVi ? 'Bạn có thể tìm kiếm nhanh mật khẩu theo tên hoặc tài khoản tại đây.' : 'You can quickly search for your passwords by name or username here.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#tour-categories',
        popover: {
          title: isVi ? 'Danh mục' : 'Categories',
          description: isVi ? 'Dễ dàng lọc các thẻ theo danh mục như Ngân hàng, Email, Website...' : 'Easily filter your items by categories like Banking, Email, Website...',
          side: "top",
          align: 'center'
        }
      }
    ],
    onDestroyStarted: async () => {
      if (!driverObj.hasNextStep()) {
        driverObj.destroy();
        localStorage.setItem("pv_has_seen_tour", "true");
        return;
      }

      const confirmExit = await Dialog.confirm(
        isVi ? "Thoát hướng dẫn" : "Exit Tour",
        isVi ? "Bạn có chắc muốn thoát hướng dẫn không?" : "Are you sure you want to exit the tour?"
      );

      if (confirmExit) {
        driverObj.destroy();
        localStorage.setItem("pv_has_seen_tour", "true");
      }
    },
  });

  driverObj.drive();
}

export function checkAndStartTour() {
  const hasSeenTour = localStorage.getItem("pv_has_seen_tour");
  if (!hasSeenTour) {
    // Small delay to let the UI render completely
    setTimeout(() => {
      startTour();
    }, 1000);
  }
}

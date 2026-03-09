<script>
  import {
    BookOpen,
    Download,
    Upload,
    Shield,
    Smartphone,
    HardDrive,
  } from "lucide-svelte";

  export let lang = "en";

  $: isVi = lang === "vi";
</script>

<div class="guide-container">
  <div class="guide-header">
    <BookOpen size={48} class="guide-icon" />
    <h1>{isVi ? "Hướng Dẫn Sử Dụng PocketVault" : "PocketVault User Guide"}</h1>
    <p class="guide-subtitle">
      {isVi
        ? "Cách sao lưu và khôi phục mật khẩu an toàn"
        : "How to backup and restore your passwords safely"}
    </p>
  </div>

  <div class="guide-content">
    <!-- Backup Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Download size={32} />
        <h2>{isVi ? "1. Cách Sao Lưu (Backup)" : "1. How to Backup"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Tại sao cần backup?" : "Why backup?"}</h3>
        <p>{isVi ? "Backup giúp bạn:" : "Backup helps you:"}</p>
        <ul>
          {#if isVi}
            <li>✅ Bảo vệ dữ liệu khi mất thiết bị</li>
            <li>✅ Chuyển mật khẩu sang máy mới</li>
            <li>✅ Khôi phục khi xóa nhầm</li>
            <li>✅ Lưu trữ offline an toàn</li>
          {:else}
            <li>✅ Protect data when device is lost</li>
            <li>✅ Transfer passwords to new device</li>
            <li>✅ Restore when accidentally deleted</li>
            <li>✅ Safe offline storage</li>
          {/if}
        </ul>

        <h3>{isVi ? "Cách thực hiện:" : "How to do it:"}</h3>
        <ol>
          {#if isVi}
            <li>
              Nhấn nút <strong>"Export Vault"</strong> ở góc trên bên phải
            </li>
            <li>Nhập Master Password để xác nhận</li>
            <li>
              File backup sẽ được tải xuống với tên: <code
                >pocketvault-backup-YYYY-MM-DD.vault</code
              >
            </li>
            <li>File được mã hóa AES-256-GCM - an toàn tuyệt đối!</li>
          {:else}
            <li>
              Click <strong>"Export Vault"</strong> button in top right corner
            </li>
            <li>Enter Master Password to confirm</li>
            <li>
              Backup file will be downloaded as: <code
                >pocketvault-backup-YYYY-MM-DD.vault</code
              >
            </li>
            <li>File is encrypted with AES-256-GCM - absolutely secure!</li>
          {/if}
        </ol>

        <div class="tip-box success">
          <Shield size={20} />
          <div>
            <strong>{isVi ? "Mẹo:" : "Tip:"}</strong>
            {isVi
              ? "App tự động tạo backup sau mỗi lần thêm/sửa mật khẩu. Bạn có thể tìm thấy trong phần Auto-Backup (nếu đã bật)."
              : "App automatically creates backup after each add/edit. You can find them in Auto-Backup section (if enabled)."}
          </div>
        </div>
      </div>
    </section>

    <!-- Restore Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Upload size={32} />
        <h2>{isVi ? "2. Cách Khôi Phục (Restore)" : "2. How to Restore"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Khi nào cần restore?" : "When to restore?"}</h3>
        <ul>
          {#if isVi}
            <li>📱 Chuyển sang máy mới</li>
            <li>🔄 Cài đặt lại app</li>
            <li>💾 Khôi phục từ backup cũ</li>
            <li>🔀 Gộp mật khẩu từ nhiều thiết bị</li>
          {:else}
            <li>📱 Moving to new device</li>
            <li>🔄 Reinstalling app</li>
            <li>💾 Restoring from old backup</li>
            <li>🔀 Merging passwords from multiple devices</li>
          {/if}
        </ul>

        <h3>{isVi ? "Cách thực hiện:" : "How to do it:"}</h3>
        <ol>
          {#if isVi}
            <li>
              Nhấn nút <strong>"Import Vault"</strong> ở góc trên bên phải
            </li>
            <li>Chọn file backup (.vault)</li>
            <li>Nhập Master Password của file backup</li>
            <li>
              Chọn cách gộp dữ liệu:
              <ul>
                <li><strong>Merge:</strong> Gộp với mật khẩu hiện tại</li>
                <li><strong>Replace:</strong> Thay thế hoàn toàn</li>
              </ul>
            </li>
          {:else}
            <li>
              Click <strong>"Import Vault"</strong> button in top right corner
            </li>
            <li>Select backup file (.vault)</li>
            <li>Enter Master Password of the backup file</li>
            <li>
              Choose merge method:
              <ul>
                <li><strong>Merge:</strong> Combine with current passwords</li>
                <li><strong>Replace:</strong> Replace completely</li>
              </ul>
            </li>
          {/if}
        </ol>

        <div class="tip-box warning">
          <Shield size={20} />
          <div>
            <strong>{isVi ? "Lưu ý:" : "Note:"}</strong>
            {isVi
              ? 'Nếu chọn "Replace", tất cả mật khẩu hiện tại sẽ bị xóa. Hãy backup trước khi thực hiện!'
              : 'If you choose "Replace", all current passwords will be deleted. Please backup first!'}
          </div>
        </div>
      </div>
    </section>

    <!-- Storage Guide -->
    <section class="guide-section">
      <div class="section-header">
        <HardDrive size={32} />
        <h2>{isVi ? "3. Nơi Lưu Backup An Toàn" : "3. Safe Backup Storage"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Khuyến nghị lưu trữ:" : "Storage recommendations:"}</h3>

        <div class="storage-option">
          <h4>
            {isVi
              ? "🔒 Tốt nhất: USB/Ổ cứng ngoài"
              : "🔒 Best: USB/External Drive"}
          </h4>
          <ul>
            {#if isVi}
              <li>✅ Offline hoàn toàn - không bị hack</li>
              <li>✅ Kiểm soát 100%</li>
              <li>✅ Không giới hạn dung lượng</li>
              <li>⚠️ Cần bảo quản cẩn thận</li>
            {:else}
              <li>✅ Completely offline - cannot be hacked</li>
              <li>✅ 100% control</li>
              <li>✅ Unlimited storage</li>
              <li>⚠️ Requires careful storage</li>
            {/if}
          </ul>
        </div>

        <div class="storage-option">
          <h4>
            {isVi
              ? "☁️ Tốt: Cloud Storage (mã hóa)"
              : "☁️ Good: Cloud Storage (encrypted)"}
          </h4>
          <ul>
            {#if isVi}
              <li>✅ Truy cập mọi lúc mọi nơi</li>
              <li>✅ Tự động đồng bộ</li>
              <li>✅ File đã được mã hóa AES-256</li>
              <li>⚠️ Cần internet</li>
            {:else}
              <li>✅ Access anytime, anywhere</li>
              <li>✅ Auto sync</li>
              <li>✅ File already encrypted with AES-256</li>
              <li>⚠️ Requires internet</li>
            {/if}
          </ul>
          <p>
            <em
              >{isVi
                ? "Gợi ý: Google Drive, iCloud, Dropbox, OneDrive"
                : "Suggestions: Google Drive, iCloud, Dropbox, OneDrive"}</em
            >
          </p>
        </div>

        <div class="storage-option">
          <h4>
            {isVi
              ? "📧 Khả dụng: Email cho chính mình"
              : "📧 Usable: Email to yourself"}
          </h4>
          <ul>
            {#if isVi}
              <li>✅ Dễ dàng và nhanh chóng</li>
              <li>✅ Luôn có sẵn</li>
              <li>⚠️ Giới hạn kích thước file</li>
              <li>⚠️ Cần quản lý email cẩn thận</li>
            {:else}
              <li>✅ Easy and quick</li>
              <li>✅ Always available</li>
              <li>⚠️ File size limit</li>
              <li>⚠️ Requires careful email management</li>
            {/if}
          </ul>
        </div>

        <div class="tip-box info">
          <Shield size={20} />
          <div>
            <strong>{isVi ? "Chiến lược 3-2-1:" : "3-2-1 Strategy:"}</strong>
            <ul>
              {#if isVi}
                <li>3 bản backup</li>
                <li>2 loại phương tiện khác nhau (USB + Cloud)</li>
                <li>1 bản lưu ở nơi khác (nhà bạn bè, két sắt...)</li>
              {:else}
                <li>3 backup copies</li>
                <li>2 different media types (USB + Cloud)</li>
                <li>1 copy stored elsewhere (friend's house, safe...)</li>
              {/if}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Shield size={32} />
        <h2>{isVi ? "4. Bảo Mật Backup" : "4. Backup Security"}</h2>
      </div>
      <div class="section-content">
        <h3>
          {isVi
            ? "File backup của bạn được bảo vệ bởi:"
            : "Your backup file is protected by:"}
        </h3>
        <ul>
          <li>
            🔐 <strong>AES-256-GCM:</strong>
            {isVi
              ? "Mã hóa quân sự, không thể bẻ khóa"
              : "Military-grade encryption, unbreakable"}
          </li>
          <li>
            🔑 <strong>PBKDF2:</strong>
            {isVi
              ? "600,000 vòng lặp - chống brute force"
              : "600,000 iterations - prevents brute force"}
          </li>
          <li>
            ✅ <strong>Checksum:</strong>
            {isVi ? "Phát hiện file bị sửa đổi" : "Detects file tampering"}
          </li>
          <li>
            🔒 <strong>Zero-cloud:</strong>
            {isVi ? "Không lưu trên server nào" : "Not stored on any server"}
          </li>
        </ul>

        <h3>{isVi ? "Master Password mạnh:" : "Strong Master Password:"}</h3>
        <ul>
          {#if isVi}
            <li>✅ Tối thiểu 12 ký tự</li>
            <li>✅ Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt</li>
            <li>✅ Không dùng từ điển, tên, ngày sinh</li>
            <li>✅ Duy nhất - không dùng lại ở đâu khác</li>
          {:else}
            <li>✅ Minimum 12 characters</li>
            <li>✅ Mix uppercase, lowercase, numbers, special characters</li>
            <li>✅ Don't use dictionary words, names, birthdays</li>
            <li>✅ Unique - don't reuse elsewhere</li>
          {/if}
        </ul>

        <div class="tip-box success">
          <Shield size={20} />
          <div>
            <strong
              >{isVi
                ? "Ví dụ Master Password tốt:"
                : "Good Master Password example:"}</strong
            >
            <code>My$ecur3P@ssw0rd!2024</code>
            <br />
            <em
              >{isVi
                ? "Dễ nhớ nhưng rất khó đoán!"
                : "Easy to remember but very hard to guess!"}</em
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Transfer Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Smartphone size={32} />
        <h2>{isVi ? "5. Chuyển Sang Máy Mới" : "5. Transfer to New Device"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Quy trình chuyển máy:" : "Transfer process:"}</h3>
        <ol>
          <li>
            <strong>{isVi ? "Trên máy cũ:" : "On old device:"}</strong>
            <ul>
              {#if isVi}
                <li>Export vault ra file backup</li>
                <li>Lưu file vào cloud hoặc gửi email cho chính mình</li>
                <li>Ghi nhớ Master Password</li>
              {:else}
                <li>Export vault to backup file</li>
                <li>Save file to cloud or email to yourself</li>
                <li>Remember Master Password</li>
              {/if}
            </ul>
          </li>
          <li>
            <strong>{isVi ? "Trên máy mới:" : "On new device:"}</strong>
            <ul>
              {#if isVi}
                <li>Cài đặt PocketVault</li>
                <li>Tải file backup về</li>
                <li>Import vault</li>
                <li>Nhập Master Password</li>
                <li>Hoàn tất! ✅</li>
              {:else}
                <li>Install PocketVault</li>
                <li>Download backup file</li>
                <li>Import vault</li>
                <li>Enter Master Password</li>
                <li>Done! ✅</li>
              {/if}
            </ul>
          </li>
        </ol>

        <div class="tip-box info">
          <Smartphone size={20} />
          <div>
            <strong>{isVi ? "Lưu ý:" : "Note:"}</strong>
            {isVi
              ? "Nếu dùng native app (iOS/Android), bạn có thể dùng tính năng Share để gửi file backup qua AirDrop, Bluetooth, hoặc các app khác."
              : "If using native app (iOS/Android), you can use Share feature to send backup file via AirDrop, Bluetooth, or other apps."}
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="guide-section">
      <div class="section-header">
        <BookOpen size={32} />
        <h2>
          {isVi ? "6. Câu Hỏi Thường Gặp" : "6. Frequently Asked Questions"}
        </h2>
      </div>
      <div class="section-content">
        <div class="faq-item">
          <h4>
            {isVi
              ? "❓ Tôi quên Master Password thì sao?"
              : "❓ What if I forget Master Password?"}
          </h4>
          <p>
            {isVi
              ? "Rất tiếc, không có cách nào khôi phục. Đây là thiết kế bảo mật - không ai có thể truy cập vault của bạn, kể cả chúng tôi. Hãy ghi nhớ Master Password cẩn thận!"
              : "Unfortunately, there's no way to recover. This is a security design - no one can access your vault, not even us. Please remember your Master Password carefully!"}
          </p>
        </div>

        <div class="faq-item">
          <h4>
            {isVi
              ? "❓ File backup có an toàn không?"
              : "❓ Is backup file safe?"}
          </h4>
          <p>
            {isVi
              ? "Có! File được mã hóa AES-256-GCM với Master Password của bạn. Ngay cả khi ai đó lấy được file, họ không thể đọc được nội dung nếu không có Master Password."
              : "Yes! File is encrypted with AES-256-GCM using your Master Password. Even if someone gets the file, they cannot read the content without Master Password."}
          </p>
        </div>

        <div class="faq-item">
          <h4>
            {isVi
              ? "❓ Tôi nên backup bao lâu một lần?"
              : "❓ How often should I backup?"}
          </h4>
          <p>
            {isVi
              ? "App tự động tạo backup sau mỗi thay đổi. Nhưng bạn nên export thủ công ít nhất 1 tháng/lần và lưu ở nơi an toàn."
              : "App automatically creates backup after each change. But you should manually export at least once a month and store it safely."}
          </p>
        </div>

        <div class="faq-item">
          <h4>
            {isVi
              ? "❓ Tôi có thể dùng cùng vault trên nhiều thiết bị?"
              : "❓ Can I use same vault on multiple devices?"}
          </h4>
          <p>
            {isVi
              ? "Có! Export từ thiết bị này và import vào thiết bị khác. Tuy nhiên, các thay đổi không tự động đồng bộ - bạn cần export/import thủ công khi có cập nhật."
              : "Yes! Export from one device and import to another. However, changes don't auto-sync - you need to manually export/import when updated."}
          </p>
        </div>

        <div class="faq-item">
          <h4>
            {isVi
              ? "❓ File backup có hết hạn không?"
              : "❓ Does backup file expire?"}
          </h4>
          <p>
            {isVi
              ? "Không! File backup có thể dùng mãi mãi, miễn là bạn nhớ Master Password."
              : "No! Backup file can be used forever, as long as you remember the Master Password."}
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="guide-footer">
      <Shield size={24} />
      <p>
        <strong>PocketVault</strong> - {isVi
          ? "Quản lý mật khẩu an toàn, offline, zero-cloud."
          : "Secure password manager, offline, zero-cloud."}
        <br />
        {isVi
          ? "Mã hóa AES-256-GCM | PBKDF2 600k iterations | 100% Client-side"
          : "AES-256-GCM encryption | PBKDF2 600k iterations | 100% Client-side"}
      </p>

      <div class="legal-links">
        <a href="/privacy">{isVi ? "Chính Sách Bảo Mật" : "Privacy Policy"}</a>
        <span class="separator">•</span>
        <a href="/terms">{isVi ? "Điều Khoản Sử Dụng" : "Terms of Service"}</a>
      </div>

      <div class="creator-info">
        <h3>{isVi ? "Người Tạo App" : "App Creator"}</h3>
        <p class="creator-name">Đạt Trần</p>
        <div class="creator-links">
          <a
            href="https://www.linkedin.com/in/stevedat/"
            target="_blank"
            rel="noopener noreferrer"
            class="creator-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
              />
            </svg>
            LinkedIn
          </a>
          <a href="mailto:eduflows.app@gmail.com" class="creator-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/stevedat/PERSONAL-PASSWORD-VAULT"
            target="_blank"
            rel="noopener noreferrer"
            class="creator-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .guide-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .guide-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(
      135deg,
      rgba(74, 158, 255, 0.1),
      rgba(138, 43, 226, 0.1)
    );
    border-radius: 16px;
    border: 1px solid rgba(74, 158, 255, 0.2);
  }

  .guide-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 0.5rem;
  }

  .dark .guide-header h1 {
    color: #ffffff;
  }

  .guide-subtitle {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.7);
  }

  .guide-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .guide-section {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid var(--border-color);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .guide-section:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
  }

  .section-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 0;
  }

  .dark .section-header h2 {
    color: #ffffff;
  }

  .section-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 1.5rem 0 1rem 0;
  }

  .dark .section-content h3 {
    color: #ffffff;
  }

  .section-content h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 1rem 0 0.5rem 0;
  }

  .dark .section-content h4 {
    color: #ffffff;
  }

  .section-content p {
    color: rgba(0, 0, 0, 0.8);
    line-height: 1.6;
    margin: 0.5rem 0;
  }

  .dark .section-content p {
    color: rgba(255, 255, 255, 0.95);
  }

  .section-content ul,
  .section-content ol {
    color: rgba(0, 0, 0, 0.8);
    line-height: 1.8;
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .dark .section-content ul,
  .dark .section-content ol {
    color: rgba(255, 255, 255, 0.95);
  }

  .section-content li {
    margin: 0.5rem 0;
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .section-content li {
    color: rgba(255, 255, 255, 0.95);
  }

  .section-content code {
    background: rgba(74, 158, 255, 0.15);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: "Courier New", monospace;
    font-size: 0.9em;
    color: #2563eb;
    font-weight: 500;
  }

  .dark .section-content code {
    background: rgba(74, 158, 255, 0.2);
    color: #8ec9ff;
  }

  .tip-box {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    border-left: 4px solid;
  }

  .tip-box.success {
    background: rgba(34, 197, 94, 0.15);
    border-color: #22c55e;
  }

  .tip-box.success strong {
    color: #16a34a;
  }

  .dark .tip-box.success strong {
    color: #4ade80;
  }

  .tip-box.success div {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .tip-box.success div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box.warning {
    background: rgba(251, 146, 60, 0.15);
    border-color: #fb923c;
  }

  .tip-box.warning strong {
    color: #ea580c;
  }

  .dark .tip-box.warning strong {
    color: #fbbf24;
  }

  .tip-box.warning div {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .tip-box.warning div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box.info {
    background: rgba(74, 158, 255, 0.15);
    border-color: var(--primary);
  }

  .tip-box.info strong {
    color: #2563eb;
  }

  .dark .tip-box.info strong {
    color: #6eb6ff;
  }

  .tip-box.info div {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .tip-box.info div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box strong {
    color: rgba(0, 0, 0, 0.9);
  }

  .dark .tip-box strong {
    color: #ffffff;
  }

  .tip-box ul {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .tip-box ul {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box li {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .tip-box li {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option {
    background: rgba(74, 158, 255, 0.08);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    border: 1px solid rgba(74, 158, 255, 0.25);
  }

  .storage-option h4 {
    margin-top: 0;
    color: rgba(0, 0, 0, 0.9);
  }

  .dark .storage-option h4 {
    color: #ffffff;
  }

  .storage-option p {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .storage-option p {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option ul {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .storage-option ul {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option li {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .storage-option li {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option em {
    color: rgba(0, 0, 0, 0.7);
  }

  .dark .storage-option em {
    color: rgba(255, 255, 255, 0.85);
  }

  .faq-item {
    background: rgba(74, 158, 255, 0.08);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    border-left: 3px solid var(--primary);
  }

  .faq-item h4 {
    color: #2563eb;
    margin-top: 0;
  }

  .dark .faq-item h4 {
    color: #6eb6ff;
  }

  .faq-item p {
    color: rgba(0, 0, 0, 0.8);
  }

  .dark .faq-item p {
    color: rgba(255, 255, 255, 0.95);
  }

  .guide-footer {
    text-align: center;
    padding: 2rem;
    margin-top: 2rem;
    border-top: 2px solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .guide-footer p {
    color: rgba(0, 0, 0, 0.8);
    line-height: 1.6;
    margin: 0;
  }

  .dark .guide-footer p {
    color: rgba(255, 255, 255, 0.95);
  }

  .guide-footer strong {
    color: rgba(0, 0, 0, 0.9);
  }

  .dark .guide-footer strong {
    color: #ffffff;
  }

  .creator-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    text-align: center;
  }

  .creator-info h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin: 0 0 0.5rem 0;
  }

  .dark .creator-info h3 {
    color: rgba(255, 255, 255, 0.9);
  }

  .creator-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #2563eb;
    margin: 0.5rem 0 1rem 0;
  }

  .creator-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .creator-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(74, 158, 255, 0.15);
    border: 1px solid rgba(74, 158, 255, 0.4);
    border-radius: 8px;
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .creator-link:hover {
    background: rgba(74, 158, 255, 0.25);
    border-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 158, 255, 0.4);
    color: #1e40af;
  }

  .creator-link:active {
    transform: translateY(0);
  }

  .creator-link svg {
    flex-shrink: 0;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .guide-container {
      padding: 1rem 0.75rem;
    }

    .guide-header {
      padding: 1.5rem 1rem;
      margin-bottom: 1.5rem;
    }

    .guide-header h1 {
      font-size: 1.5rem;
      line-height: 1.3;
    }

    .guide-subtitle {
      font-size: 0.95rem;
    }

    .guide-section {
      padding: 1.25rem 1rem;
      margin-bottom: 1rem;
    }

    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .section-header h2 {
      font-size: 1.25rem;
    }

    .section-content h3 {
      font-size: 1.1rem;
    }

    .section-content h4 {
      font-size: 1rem;
    }

    .section-content p,
    .section-content ul,
    .section-content ol {
      font-size: 0.95rem;
    }

    .section-content code {
      font-size: 0.85rem;
      word-break: break-all;
    }

    .tip-box {
      flex-direction: column;
      gap: 0.75rem;
      padding: 0.875rem;
    }

    .storage-option {
      padding: 0.875rem;
    }

    .faq-item {
      padding: 0.875rem;
    }

    .creator-links {
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
    }

    .creator-link {
      justify-content: center;
      padding: 0.875rem 1rem;
      width: 100%;
    }

    .guide-footer {
      padding: 1.5rem 1rem;
    }

    .creator-info {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
    }

    .legal-links {
      margin-top: 1rem;
      gap: 1rem;
    }
  }

  .legal-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.9rem;
  }

  .legal-links a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .legal-links a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  .separator {
    color: var(--text-secondary);
    opacity: 0.5;
  }

  /* Extra small mobile */
  @media (max-width: 375px) {
    .guide-container {
      padding: 0.75rem 0.5rem;
    }

    .guide-header {
      padding: 1.25rem 0.75rem;
    }

    .guide-header h1 {
      font-size: 1.35rem;
    }

    .guide-subtitle {
      font-size: 0.9rem;
    }

    .guide-section {
      padding: 1rem 0.75rem;
    }

    .section-header h2 {
      font-size: 1.15rem;
    }

    .section-content h3 {
      font-size: 1.05rem;
    }

    .section-content h4 {
      font-size: 0.95rem;
    }

    .section-content p,
    .section-content ul,
    .section-content ol {
      font-size: 0.9rem;
    }
  }
</style>

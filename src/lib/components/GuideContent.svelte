<script>
  import {
    BookOpen,
    Download,
    Upload,
    Shield,
    Smartphone,
    HardDrive,
    Cloud,
    ScanFace
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
    <!-- 1. Cloud Sync Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Cloud size={32} />
        <h2>{isVi ? "1. Đồng Bộ Đám Mây (Cloud Sync)" : "1. Cloud Sync"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Tính năng đồng bộ:" : "Sync Features:"}</h3>
        <ul>
          {#if isVi}
            <li>✅ Tự động đồng bộ mật khẩu trên mọi thiết bị của bạn</li>
            <li>✅ Mã hóa đầu cuối (E2EE) trước khi tải lên</li>
            <li>✅ Máy chủ chỉ lưu dữ liệu đã mã hóa, hoàn toàn Zero-Knowledge</li>
          {:else}
            <li>✅ Auto sync passwords across all your devices</li>
            <li>✅ End-to-End Encrypted (E2EE) before upload</li>
            <li>✅ Server only stores encrypted data, completely Zero-Knowledge</li>
          {/if}
        </ul>

        <h3>{isVi ? "Cách sử dụng:" : "How to use:"}</h3>
        <ol>
          {#if isVi}
            <li>Nhấn biểu tượng <strong>Đám mây (Cloud)</strong> trên thanh công cụ</li>
            <li>Đăng ký hoặc đăng nhập tài khoản bảo mật của bạn</li>
            <li>Dữ liệu sẽ tự động đồng bộ mỗi khi có thay đổi!</li>
            <li>Nhấn lại biểu tượng Đám Mây nếu muốn ép đồng bộ ngay lập tức.</li>
          {:else}
            <li>Click the <strong>Cloud icon</strong> on the toolbar</li>
            <li>Register or login to your secure account</li>
            <li>Data will automatically sync whenever there are changes!</li>
            <li>Click the Cloud icon again to force immediate sync.</li>
          {/if}
        </ol>

        <div class="tip-box info">
          <Shield size={20} />
          <div>
            <strong>{isVi ? "Lưu ý bảo mật:" : "Security Note:"}</strong>
            {isVi
              ? "Cloud Sync luôn dùng Master Password của bạn để mã hóa. Nếu đổi Master Password, hãy đảm bảo các thiết bị khác cũng biết mật khẩu mới."
              : "Cloud Sync always uses your Master Password to encrypt. If you change your Master Password, ensure other devices know the new password."}
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Biometric Guide -->
    <section class="guide-section">
      <div class="section-header">
        <ScanFace size={32} />
        <h2>{isVi ? "2. Khóa Sinh Trắc Học" : "2. Biometric Unlock"}</h2>
      </div>
      <div class="section-content">
        <h3>{isVi ? "Mở khóa siêu tốc:" : "Lightning Fast Unlock:"}</h3>
        <ul>
          {#if isVi}
            <li>✅ Hỗ trợ Face ID, Touch ID, Windows Hello</li>
            <li>✅ Không cần gõ lại Master Password mỗi lần vào app</li>
            <li>✅ App tự động khóa khi bạn rời đi (Auto-lock)</li>
          {:else}
            <li>✅ Supports Face ID, Touch ID, Windows Hello</li>
            <li>✅ No need to re-type Master Password every time</li>
            <li>✅ Automatically locks when you leave the app (Auto-lock)</li>
          {/if}
        </ul>
        <h3>{isVi ? "Cách bật:" : "How to enable:"}</h3>
        <ol>
          {#if isVi}
            <li>Nhấn biểu tượng <strong>Vân tay/Khuôn mặt</strong> ở góc phải trên cùng</li>
            <li>Nhập Master Password lần cuối để xác thực</li>
            <li>Chạm vân tay/quét khuôn mặt để cấp quyền</li>
          {:else}
            <li>Click the <strong>Fingerprint/Face</strong> icon in top right corner</li>
            <li>Enter Master Password one last time to authenticate</li>
            <li>Scan fingerprint/face to grant permission</li>
          {/if}
        </ol>
      </div>
    </section>

    <!-- 3. Backup Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Download size={32} />
        <h2>{isVi ? "3. Sao Lưu Thủ Công (Backup)" : "3. Manual Backup"}</h2>
      </div>
      <div class="section-content">
        <p>{isVi ? "Bên cạnh Cloud Sync, bạn nên backup file thủ công định kỳ:" : "Besides Cloud Sync, you should manually backup periodically:"}</p>
        <ul>
          {#if isVi}
            <li>✅ Lưu trữ offline 100% (USB, Ổ cứng ngoài)</li>
            <li>✅ Khôi phục lại bản cũ nếu lỡ tay xóa nhầm</li>
          {:else}
            <li>✅ 100% offline storage (USB, External Drive)</li>
            <li>✅ Restore an older version if accidentally deleted</li>
          {/if}
        </ul>

        <ol>
          {#if isVi}
            <li>Nhấn biểu tượng <strong>Export Vault</strong> (mũi tên tải xuống)</li>
            <li>File sẽ được mã hóa với tên: <code>pocketvault-backup.vault</code></li>
          {:else}
            <li>Click <strong>Export Vault</strong> icon (download arrow)</li>
            <li>File will be encrypted as: <code>pocketvault-backup.vault</code></li>
          {/if}
        </ol>
      </div>
    </section>

    <!-- 4. Restore Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Upload size={32} />
        <h2>{isVi ? "4. Khôi Phục (Restore)" : "4. Restore"}</h2>
      </div>
      <div class="section-content">
        <ol>
          {#if isVi}
            <li>Nhấn biểu tượng <strong>Import Vault</strong> (mũi tên tải lên)</li>
            <li>Chọn file .vault và nhập Master Password của file đó</li>
            <li>Hệ thống <strong>Smart Merge</strong> sẽ tự động gộp các mật khẩu mới nhất mà không xóa mật khẩu hiện tại!</li>
          {:else}
            <li>Click <strong>Import Vault</strong> icon (upload arrow)</li>
            <li>Select .vault file and enter its Master Password</li>
            <li><strong>Smart Merge</strong> system will intelligently combine the newest passwords without deleting existing ones!</li>
          {/if}
        </ol>
      </div>
    </section>

    <!-- 5. Security Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Shield size={32} />
        <h2>{isVi ? "5. Thông Tin Bảo Mật" : "5. Security Info"}</h2>
      </div>
      <div class="section-content">
        <ul>
          <li>
            🔐 <strong>AES-256-GCM:</strong>
            {isVi ? "Thuật toán mã hóa chuẩn quân sự" : "Military-grade encryption standard"}
          </li>
          <li>
            🔑 <strong>PBKDF2 (600,000 vòng lặp):</strong>
            {isVi ? "Chống tấn công dò mật khẩu (Brute Force)" : "Prevents password guessing (Brute Force)"}
          </li>
          <li>
            🛡️ <strong>Zero-Knowledge:</strong>
            {isVi ? "Server không thể đọc, không thể khôi phục dữ liệu của bạn" : "Server cannot read or recover your data"}
          </li>
        </ul>
        <div class="tip-box success">
          <Shield size={20} />
          <div>
            <strong>{isVi ? "Khuyên dùng:" : "Recommended:"}</strong>
            {isVi ? "Hãy chọn Master Password dễ nhớ nhưng dài ít nhất 12 ký tự (VD: ToiYeuVietNam@2024!)" : "Choose an easy-to-remember but long Master Password, at least 12 chars (e.g. ILoveCats@2024!)"}
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="guide-section">
      <div class="section-header">
        <BookOpen size={32} />
        <h2>{isVi ? "6. Câu Hỏi Thường Gặp" : "6. FAQ"}</h2>
      </div>
      <div class="section-content">
        <div class="faq-item">
          <h4>{isVi ? "❓ Tôi quên Master Password thì sao?" : "❓ What if I forget Master Password?"}</h4>
          <p>{isVi ? "Rất tiếc, không có cách nào khôi phục. Đây là thiết kế bảo mật để không ai (kể cả admin) có thể hack được vault của bạn." : "Unfortunately, there's no way to recover. This is a security design so nobody (even admins) can hack your vault."}</p>
        </div>
        <div class="faq-item">
          <h4>{isVi ? "❓ Đổi sang thiết bị mới như thế nào?" : "❓ How to migrate to a new device?"}</h4>
          <p>{isVi ? "Rất đơn giản! Cách 1 (Dễ nhất): Cài app, đăng nhập Cloud Sync, dữ liệu tự ùa về. Cách 2: Export file backup từ máy cũ, gửi sang máy mới rồi Import." : "Very easy! Method 1 (Easiest): Install app, login to Cloud Sync, data downloads automatically. Method 2: Export backup from old device, send it to new device and Import."}</p>
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

  :global(.dark) .guide-header h1 {
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

  :global(.dark) .section-header h2 {
    color: #ffffff;
  }

  .section-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 1.5rem 0 1rem 0;
  }

  :global(.dark) .section-content h3 {
    color: #ffffff;
  }

  .section-content h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin: 1rem 0 0.5rem 0;
  }

  :global(.dark) .section-content h4 {
    color: #ffffff;
  }

  .section-content p {
    color: rgba(0, 0, 0, 0.8);
    line-height: 1.6;
    margin: 0.5rem 0;
  }

  :global(.dark) .section-content p {
    color: rgba(255, 255, 255, 0.95);
  }

  .section-content ul,
  .section-content ol {
    color: rgba(0, 0, 0, 0.8);
    line-height: 1.8;
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  :global(.dark) .section-content ul,
  :global(.dark) .section-content ol {
    color: rgba(255, 255, 255, 0.95);
  }

  .section-content li {
    margin: 0.5rem 0;
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .section-content li {
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

  :global(.dark) .section-content code {
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

  :global(.dark) .tip-box.success strong {
    color: #4ade80;
  }

  .tip-box.success div {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .tip-box.success div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box.warning {
    background: rgba(251, 146, 60, 0.15);
    border-color: #fb923c;
  }

  .tip-box.warning strong {
    color: #ea580c;
  }

  :global(.dark) .tip-box.warning strong {
    color: #fbbf24;
  }

  .tip-box.warning div {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .tip-box.warning div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box.info {
    background: rgba(74, 158, 255, 0.15);
    border-color: var(--primary);
  }

  .tip-box.info strong {
    color: #2563eb;
  }

  :global(.dark) .tip-box.info strong {
    color: #6eb6ff;
  }

  .tip-box.info div {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .tip-box.info div {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box strong {
    color: rgba(0, 0, 0, 0.9);
  }

  :global(.dark) .tip-box strong {
    color: #ffffff;
  }

  .tip-box ul {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .tip-box ul {
    color: rgba(255, 255, 255, 0.95);
  }

  .tip-box li {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .tip-box li {
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

  :global(.dark) .storage-option h4 {
    color: #ffffff;
  }

  .storage-option p {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .storage-option p {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option ul {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .storage-option ul {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option li {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .storage-option li {
    color: rgba(255, 255, 255, 0.95);
  }

  .storage-option em {
    color: rgba(0, 0, 0, 0.7);
  }

  :global(.dark) .storage-option em {
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

  :global(.dark) .faq-item h4 {
    color: #6eb6ff;
  }

  .faq-item p {
    color: rgba(0, 0, 0, 0.8);
  }

  :global(.dark) .faq-item p {
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

  :global(.dark) .guide-footer p {
    color: rgba(255, 255, 255, 0.95);
  }

  .guide-footer strong {
    color: rgba(0, 0, 0, 0.9);
  }

  :global(.dark) .guide-footer strong {
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

  :global(.dark) .creator-info h3 {
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

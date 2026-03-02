<script>
  import { BookOpen, Download, Upload, Shield, Smartphone, HardDrive, Cloud } from "lucide-svelte";
</script>

<div class="guide-container">
  <div class="guide-header">
    <BookOpen size={48} class="guide-icon" />
    <h1>Hướng Dẫn Sử Dụng PocketVault</h1>
    <p class="guide-subtitle">Cách sao lưu và khôi phục mật khẩu an toàn</p>
  </div>

  <div class="guide-content">
    <!-- Backup Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Download size={32} />
        <h2>1. Cách Sao Lưu (Backup)</h2>
      </div>
      <div class="section-content">
        <h3>Tại sao cần backup?</h3>
        <p>Backup giúp bạn:</p>
        <ul>
          <li>✅ Bảo vệ dữ liệu khi mất thiết bị</li>
          <li>✅ Chuyển mật khẩu sang máy mới</li>
          <li>✅ Khôi phục khi xóa nhầm</li>
          <li>✅ Lưu trữ offline an toàn</li>
        </ul>

        <h3>Cách thực hiện:</h3>
        <ol>
          <li>Nhấn nút <strong>"Export Vault"</strong> ở góc trên bên phải</li>
          <li>Nhập Master Password để xác nhận</li>
          <li>File backup sẽ được tải xuống với tên: <code>pocketvault-backup-YYYY-MM-DD.vault</code></li>
          <li>File được mã hóa AES-256-GCM - an toàn tuyệt đối!</li>
        </ol>

        <div class="tip-box success">
          <Shield size={20} />
          <div>
            <strong>Mẹo:</strong> App tự động tạo backup sau mỗi lần thêm/sửa mật khẩu. 
            Bạn có thể tìm thấy trong phần Auto-Backup (nếu đã bật).
          </div>
        </div>
      </div>
    </section>

    <!-- Restore Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Upload size={32} />
        <h2>2. Cách Khôi Phục (Restore)</h2>
      </div>
      <div class="section-content">
        <h3>Khi nào cần restore?</h3>
        <ul>
          <li>📱 Chuyển sang máy mới</li>
          <li>🔄 Cài đặt lại app</li>
          <li>💾 Khôi phục từ backup cũ</li>
          <li>🔀 Gộp mật khẩu từ nhiều thiết bị</li>
        </ul>

        <h3>Cách thực hiện:</h3>
        <ol>
          <li>Nhấn nút <strong>"Import Vault"</strong> ở góc trên bên phải</li>
          <li>Chọn file backup (.vault)</li>
          <li>Nhập Master Password của file backup</li>
          <li>Chọn cách gộp dữ liệu:
            <ul>
              <li><strong>Merge:</strong> Gộp với mật khẩu hiện tại</li>
              <li><strong>Replace:</strong> Thay thế hoàn toàn</li>
            </ul>
          </li>
          <li>Xác nhận và hoàn tất!</li>
        </ol>

        <div class="tip-box warning">
          <Shield size={20} />
          <div>
            <strong>Lưu ý:</strong> Nếu chọn "Replace", tất cả mật khẩu hiện tại sẽ bị xóa. 
            Hãy backup trước khi thực hiện!
          </div>
        </div>
      </div>
    </section>

    <!-- Storage Guide -->
    <section class="guide-section">
      <div class="section-header">
        <HardDrive size={32} />
        <h2>3. Nơi Lưu Backup An Toàn</h2>
      </div>
      <div class="section-content">
        <h3>Khuyến nghị lưu trữ:</h3>

        <div class="storage-option">
          <h4>🔒 Tốt nhất: USB/Ổ cứng ngoài</h4>
          <ul>
            <li>✅ Offline hoàn toàn - không bị hack</li>
            <li>✅ Kiểm soát 100%</li>
            <li>✅ Không giới hạn dung lượng</li>
            <li>⚠️ Cần bảo quản cẩn thận</li>
          </ul>
        </div>

        <div class="storage-option">
          <h4>☁️ Tốt: Cloud Storage (mã hóa)</h4>
          <ul>
            <li>✅ Truy cập mọi lúc mọi nơi</li>
            <li>✅ Tự động đồng bộ</li>
            <li>✅ File đã được mã hóa AES-256</li>
            <li>⚠️ Cần internet</li>
          </ul>
          <p><em>Gợi ý: Google Drive, iCloud, Dropbox, OneDrive</em></p>
        </div>

        <div class="storage-option">
          <h4>📧 Khả dụng: Email cho chính mình</h4>
          <ul>
            <li>✅ Dễ dàng và nhanh chóng</li>
            <li>✅ Luôn có sẵn</li>
            <li>⚠️ Giới hạn kích thước file</li>
            <li>⚠️ Cần quản lý email cẩn thận</li>
          </ul>
        </div>

        <div class="tip-box info">
          <Shield size={20} />
          <div>
            <strong>Chiến lược 3-2-1:</strong>
            <ul>
              <li>3 bản backup</li>
              <li>2 loại phương tiện khác nhau (USB + Cloud)</li>
              <li>1 bản lưu ở nơi khác (nhà bạn bè, két sắt...)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Shield size={32} />
        <h2>4. Bảo Mật Backup</h2>
      </div>
      <div class="section-content">
        <h3>File backup của bạn được bảo vệ bởi:</h3>
        <ul>
          <li>🔐 <strong>AES-256-GCM:</strong> Mã hóa quân sự, không thể bẻ khóa</li>
          <li>🔑 <strong>PBKDF2:</strong> 600,000 vòng lặp - chống brute force</li>
          <li>✅ <strong>Checksum:</strong> Phát hiện file bị sửa đổi</li>
          <li>🔒 <strong>Zero-cloud:</strong> Không lưu trên server nào</li>
        </ul>

        <h3>Master Password mạnh:</h3>
        <ul>
          <li>✅ Tối thiểu 12 ký tự</li>
          <li>✅ Kết hợp chữ hoa, chữ thường, số, ký tự đặc biệt</li>
          <li>✅ Không dùng từ điển, tên, ngày sinh</li>
          <li>✅ Duy nhất - không dùng lại ở đâu khác</li>
        </ul>

        <div class="tip-box success">
          <Shield size={20} />
          <div>
            <strong>Ví dụ Master Password tốt:</strong>
            <code>My$ecur3P@ssw0rd!2024</code>
            <br>
            <em>Dễ nhớ nhưng rất khó đoán!</em>
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile Transfer Guide -->
    <section class="guide-section">
      <div class="section-header">
        <Smartphone size={32} />
        <h2>5. Chuyển Sang Máy Mới</h2>
      </div>
      <div class="section-content">
        <h3>Quy trình chuyển máy:</h3>
        <ol>
          <li><strong>Trên máy cũ:</strong>
            <ul>
              <li>Export vault ra file backup</li>
              <li>Lưu file vào cloud hoặc gửi email cho chính mình</li>
              <li>Ghi nhớ Master Password</li>
            </ul>
          </li>
          <li><strong>Trên máy mới:</strong>
            <ul>
              <li>Cài đặt PocketVault</li>
              <li>Tải file backup về</li>
              <li>Import vault</li>
              <li>Nhập Master Password</li>
              <li>Hoàn tất! ✅</li>
            </ul>
          </li>
        </ol>

        <div class="tip-box info">
          <Smartphone size={20} />
          <div>
            <strong>Lưu ý:</strong> Nếu dùng native app (iOS/Android), 
            bạn có thể dùng tính năng Share để gửi file backup qua AirDrop, 
            Bluetooth, hoặc các app khác.
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="guide-section">
      <div class="section-header">
        <BookOpen size={32} />
        <h2>6. Câu Hỏi Thường Gặp</h2>
      </div>
      <div class="section-content">
        <div class="faq-item">
          <h4>❓ Tôi quên Master Password thì sao?</h4>
          <p>Rất tiếc, không có cách nào khôi phục. Đây là thiết kế bảo mật - 
          không ai có thể truy cập vault của bạn, kể cả chúng tôi. 
          Hãy ghi nhớ Master Password cẩn thận!</p>
        </div>

        <div class="faq-item">
          <h4>❓ File backup có an toàn không?</h4>
          <p>Có! File được mã hóa AES-256-GCM với Master Password của bạn. 
          Ngay cả khi ai đó lấy được file, họ không thể đọc được nội dung 
          nếu không có Master Password.</p>
        </div>

        <div class="faq-item">
          <h4>❓ Tôi nên backup bao lâu một lần?</h4>
          <p>App tự động tạo backup sau mỗi thay đổi. Nhưng bạn nên export 
          thủ công ít nhất 1 tháng/lần và lưu ở nơi an toàn.</p>
        </div>

        <div class="faq-item">
          <h4>❓ Tôi có thể dùng cùng vault trên nhiều thiết bị?</h4>
          <p>Có! Export từ thiết bị này và import vào thiết bị khác. 
          Tuy nhiên, các thay đổi không tự động đồng bộ - bạn cần export/import 
          thủ công khi có cập nhật.</p>
        </div>

        <div class="faq-item">
          <h4>❓ File backup có hết hạn không?</h4>
          <p>Không! File backup có thể dùng mãi mãi, miễn là bạn nhớ Master Password.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="guide-footer">
      <Shield size={24} />
      <p>
        <strong>PocketVault</strong> - Quản lý mật khẩu an toàn, offline, zero-cloud.
        <br>
        Mã hóa AES-256-GCM | PBKDF2 600k iterations | 100% Client-side
      </p>
      
      <div class="creator-info">
        <h3>Người Tạo App</h3>
        <p class="creator-name">Đạt Trần</p>
        <div class="creator-links">
          <a 
            href="https://www.linkedin.com/in/stevedat/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="creator-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
          <a 
            href="mailto:eduflows.app@gmail.com" 
            class="creator-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
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
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
    background: linear-gradient(135deg, rgba(74, 158, 255, 0.1), rgba(138, 43, 226, 0.1));
    border-radius: 16px;
    border: 1px solid rgba(74, 158, 255, 0.2);
  }

  .guide-icon {
    color: var(--primary);
    margin-bottom: 1rem;
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

  .dark .guide-subtitle {
    color: rgba(255, 255, 255, 0.8);
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
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
    font-family: 'Courier New', monospace;
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

  .dark .creator-name {
    color: #6eb6ff;
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

  .dark .creator-link {
    color: #6eb6ff;
  }

  .creator-link:hover {
    background: rgba(74, 158, 255, 0.25);
    border-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 158, 255, 0.4);
    color: #1e40af;
  }

  .dark .creator-link:hover {
    border-color: #6eb6ff;
    color: #8ec9ff;
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

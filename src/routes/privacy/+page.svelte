<script>
    import {
        Shield,
        Lock,
        EyeOff,
        Database,
        ArrowLeft,
        Languages,
    } from "lucide-svelte";
    import { darkMode } from "$lib/stores";
    import { language } from "$lib/language";

    $: isVi = $language === "vi";
</script>

<svelte:head>
    <title
        >{isVi
            ? "Chính Sách Bảo Mật - PocketVault"
            : "Privacy Policy - PocketVault"}</title
    >
</svelte:head>

<div class="legal-page {$darkMode ? 'dark' : ''}">
    <div class="legal-container">
        <header class="legal-header">
            <div class="header-top">
                <a href="/" class="back-link">
                    <ArrowLeft size={20} />
                    <span>{isVi ? "Quay lại" : "Back"}</span>
                </a>
                <button
                    class="lang-toggle"
                    on:click={() => language.toggle()}
                    title={isVi
                        ? "Switch to English"
                        : "Chuyển sang Tiếng Việt"}
                >
                    <Languages size={20} />
                    <span>{isVi ? "English" : "Tiếng Việt"}</span>
                </button>
            </div>
            <div class="brand">
                <Shield size={40} color="#3b82f6" />
                <h1>{isVi ? "Chính Sách Bảo Mật" : "Privacy Policy"}</h1>
            </div>
        </header>

        <main class="legal-content">
            <section>
                <h2>
                    {isVi
                        ? "1. Cam Kết Quyền Riêng Tư"
                        : "1. Privacy Commitment"}
                </h2>
                <p>
                    {isVi
                        ? "PocketVault được thiết kế với triết lý 'Quyền riêng tư là trên hết'. Chúng tôi không thu thập, lưu trữ hoặc chia sẻ bất kỳ dữ liệu cá nhân nào của bạn."
                        : "PocketVault is designed with a 'Privacy-First' philosophy. We do not collect, store, or share any of your personal data."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <Database size={24} />
                    <h2>{isVi ? "2. Lưu Trữ Dữ Liệu" : "2. Data Storage"}</h2>
                </div>
                <p>
                    {isVi
                        ? "Tất cả mật khẩu và thông tin bạn nhập vào PocketVault được lưu trữ TRỰC TIẾP trên thiết bị của bạn (sử dụng IndexedDB). Không có dữ liệu nào được gửi lên máy chủ của chúng tôi hoặc bất kỳ bên thứ ba nào."
                        : "All passwords and information you enter into PocketVault are stored DIRECTLY on your device (using IndexedDB). No data is sent to our servers or any third parties."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <Lock size={24} />
                    <h2>{isVi ? "3. Mã Hóa" : "3. Encryption"}</h2>
                </div>
                <p>
                    {isVi
                        ? "Dữ liệu của bạn được bảo vệ bằng mã hóa AES-256-GCM chuẩn quân đội. Chìa khóa giải mã được tạo từ Mật khẩu Chính (Master Password) của bạn và không bao giờ được lưu trữ ở dạng văn bản thuần túy."
                        : "Your data is protected using military-grade AES-256-GCM encryption. The decryption key is derived from your Master Password and is never stored in plain text."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <EyeOff size={24} />
                    <h2>{isVi ? "4. Quyền Truy Cập" : "4. Permissions"}</h2>
                </div>
                <ul>
                    <li>
                        <strong
                            >{isVi ? "Sinh trắc học:" : "Biometrics:"}</strong
                        >
                        {isVi
                            ? "Chúng tôi sử dụng FaceID/Vân tay để mở khóa nhanh. Dữ liệu sinh trắc học được quản lý bởi hệ điều hành và app không bao giờ truy cập được dữ liệu này."
                            : "We use FaceID/Fingerprint for quick unlock. Biometric data is managed by the OS and the app never has access to it."}
                    </li>
                    <li>
                        <strong
                            >{isVi ? "Bộ nhớ/Tệp:" : "Storage/Files:"}</strong
                        >
                        {isVi
                            ? "Chỉ được sử dụng khi bạn chủ động chọn 'Export' (Xuất file sao lưu) hoặc 'Import' (Nhập file sao lưu)."
                            : "Only used when you manually select 'Export' (Save backup) or 'Import' (Load backup)."}
                    </li>
                </ul>
            </section>

            <section>
                <h2>{isVi ? "5. Liên Hệ" : "5. Contact"}</h2>
                <p>
                    {isVi
                        ? "Nếu bạn có bất kỳ câu hỏi nào về quyền riêng tư, vui lòng liên hệ qua email: stevedat@live.com"
                        : "If you have any questions about privacy, please contact via email: stevedat@live.com"}
                </p>
            </section>

            <p class="last-updated">
                {isVi
                    ? "Cập nhật lần cuối: 09/03/2026"
                    : "Last updated: March 09, 2026"}
            </p>
        </main>
    </div>
</div>

<style>
    .legal-page {
        min-height: 100vh;
        background: #f8fafc;
        color: #1e293b;
        font-family: "Inter", sans-serif;
        padding-bottom: 2rem;
    }

    .legal-page.dark {
        background: #0f172a;
        color: #f1f5f9;
    }

    .legal-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .legal-header {
        margin-bottom: 2rem;
        padding: 2rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .dark .legal-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .lang-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.2);
        color: #3b82f6;
        padding: 0.5rem 1rem;
        border-radius: 99px;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .lang-toggle:hover {
        background: rgba(59, 130, 246, 0.2);
    }

    .dark .lang-toggle {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.3);
        color: #60a5fa;
    }

    .back-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
    }

    .brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-align: center;
    }

    h1 {
        font-size: 2.25rem;
        font-weight: 800;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: #3b82f6;
    }

    .icon-text {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-top: 2rem;
    }

    .icon-text h2 {
        margin-top: 0;
        margin-bottom: 0;
    }

    p {
        line-height: 1.6;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }

    ul {
        list-style: disc;
        padding-left: 1.5rem;
        margin-bottom: 1rem;
    }

    li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
    }

    .last-updated {
        margin-top: 4rem;
        font-size: 0.875rem;
        opacity: 0.6;
        text-align: center;
    }

    @media (max-width: 640px) {
        h1 {
            font-size: 1.75rem;
        }
        h2 {
            font-size: 1.25rem;
        }
    }
</style>

<script>
    import { Shield, Lock, EyeOff, Database } from "lucide-svelte";

    export let lang = "en";
    $: isVi = lang === "vi";
</script>

<div class="legal-content-container">
    <div class="legal-header">
        <Shield size={48} color="#3b82f6" />
        <h1>{isVi ? "Chính Sách Bảo Mật" : "Privacy Policy"}</h1>
        <p class="last-updated">
            {isVi ? "Cập nhật: 09/03/2026" : "Updated: March 09, 2026"}
        </p>
    </div>

    <div class="legal-body">
        <section>
            <h2>
                {isVi ? "1. Cam Kết Quyền Riêng Tư" : "1. Privacy Commitment"}
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
                    ? "Tất cả mật khẩu được lưu TRỰC TIẾP trên thiết bị (IndexedDB). Không có dữ liệu nào được gửi lên máy chủ của chúng tôi hoặc bất kỳ bên thứ ba nào."
                    : "All passwords are stored DIRECTLY on your device (IndexedDB). No data is sent to our servers or any third parties."}
            </p>
        </section>

        <section>
            <div class="icon-text">
                <Lock size={24} />
                <h2>{isVi ? "3. Mã Hóa" : "3. Encryption"}</h2>
            </div>
            <p>
                {isVi
                    ? "Dữ liệu được bảo vệ bằng mã hóa AES-256-GCM. Chìa khóa được tạo từ Mật khẩu Chính (Master Password) và không bao giờ được lưu trữ ở dạng văn bản thuần túy."
                    : "Data is protected using AES-256-GCM encryption. The key is derived from your Master Password and is never stored in plain text."}
            </p>
        </section>

        <section>
            <div class="icon-text">
                <EyeOff size={24} />
                <h2>{isVi ? "4. Quyền Truy Cập" : "4. Permissions"}</h2>
            </div>
            <ul>
                <li>
                    <strong>{isVi ? "Sinh trắc học:" : "Biometrics:"}</strong>
                    {isVi
                        ? "FaceID/Vân tay để mở khóa nhanh. Dữ liệu này do hệ điều hành quản lý, app không bao giờ truy cập được."
                        : "FaceID/Fingerprint for quick unlock. Managed by OS, app never has access."}
                </li>
                <li>
                    <strong>{isVi ? "Tệp tin:" : "Files:"}</strong>
                    {isVi
                        ? "Chỉ sử dụng khi bạn chọn 'Export' hoặc 'Import' file sao lưu."
                        : "Only used when you select 'Export' or 'Import' backup files."}
                </li>
            </ul>
        </section>

        <section>
            <h2>{isVi ? "5. Liên Hệ" : "5. Contact"}</h2>
            <p>
                {isVi
                    ? "Email: eduflows.app@gmail.com"
                    : "Email: eduflows.app@gmail.com"}
            </p>
        </section>
    </div>
</div>

<style>
    .legal-content-container {
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

    .legal-header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 2rem;
        background: rgba(59, 130, 246, 0.05);
        border-radius: 16px;
        border: 1px solid rgba(59, 130, 246, 0.1);
    }

    h1 {
        font-size: 2rem;
        font-weight: 800;
        margin: 1rem 0 0.5rem 0;
    }

    .last-updated {
        font-size: 0.875rem;
        opacity: 0.6;
    }

    .legal-body {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #3b82f6;
        margin-bottom: 1rem;
    }

    .icon-text {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .icon-text h2 {
        margin: 0;
    }

    p {
        line-height: 1.6;
        font-size: 1.1rem;
        opacity: 0.9;
    }

    ul {
        list-style: disc;
        padding-left: 1.5rem;
    }

    li {
        margin-bottom: 0.5rem;
    }
</style>

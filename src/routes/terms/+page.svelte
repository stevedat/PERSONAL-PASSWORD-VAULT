<script>
    import {
        FileText,
        ShieldAlert,
        AlertTriangle,
        CheckCircle,
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
            ? "Điều Khoản Sử Dụng - PocketVault"
            : "Terms of Service - PocketVault"}</title
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
                <FileText size={40} color="#3b82f6" />
                <h1>{isVi ? "Điều Khoản Sử Dụng" : "Terms of Service"}</h1>
            </div>
        </header>

        <main class="legal-content">
            <section>
                <p>
                    {isVi
                        ? "Bằng cách sử dụng PocketVault, bạn đồng ý với các điều khoản sau đây. Vui lòng đọc kỹ."
                        : "By using PocketVault, you agree to the following terms. Please read them carefully."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <ShieldAlert size={24} />
                    <h2>
                        {isVi
                            ? "1. Trách Nhiệm Về Mật Khẩu"
                            : "1. Password Responsibility"}
                    </h2>
                </div>
                <p>
                    {isVi
                        ? "PocketVault là một ứng dụng ngoại tuyến (offline). Chúng tôi KHÔNG lưu trữ Mật khẩu Chính (Master Password) của bạn. Nếu bạn quên mật khẩu này, chúng tôi không thể giúp bạn khôi phục dữ liệu. Bạn hoàn toàn chịu trách nhiệm về việc ghi nhớ và bảo vệ mật khẩu của mình."
                        : "PocketVault is an offline application. We DO NOT store your Master Password. If you forget this password, we cannot help you recover your data. You are solely responsible for remembering and protecting your password."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <AlertTriangle size={24} />
                    <h2>
                        {isVi
                            ? "2. Miễn Trừ Trách Nhiệm"
                            : "2. Disclaimer of Liability"}
                    </h2>
                </div>
                <p>
                    {isVi
                        ? "PocketVault được cung cấp 'nguyên trạng' mà không có bất kỳ sự đảm bảo nào. Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất dữ liệu, hư hỏng thiết bị hoặc rò rỉ thông tin nào phát sinh từ việc sử dụng ứng dụng không đúng cách hoặc do lỗi phần cứng/phần mềm của bên thứ ba."
                        : "PocketVault is provided 'as is' without any warranties. We are not liable for any data loss, device damage, or information leaks arising from improper use of the application or due to third-party hardware/software errors."}
                </p>
            </section>

            <section>
                <div class="icon-text">
                    <CheckCircle size={24} />
                    <h2>
                        {isVi ? "3. Sử Dụng Hợp Pháp" : "3. Acceptable Use"}
                    </h2>
                </div>
                <p>
                    {isVi
                        ? "Bạn đồng ý không sử dụng PocketVault cho bất kỳ mục đích bất hợp pháp nào. Bạn cam kết sở hữu hoặc có quyền sử dụng thông tin mà bạn lưu trữ trong ứng dụng."
                        : "You agree not to use PocketVault for any illegal purposes. You represent that you own or have the right to use the information stored in the application."}
                </p>
            </section>

            <section>
                <h2>
                    {isVi ? "4. Thay Đổi Điều Khoản" : "4. Changes to Terms"}
                </h2>
                <p>
                    {isVi
                        ? "Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được cập nhật trong ứng dụng."
                        : "We reserve the right to update these terms at any time. Changes will take effect immediately upon being updated in the application."}
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
    /* Sharing styles with Privacy Page for consistency */
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

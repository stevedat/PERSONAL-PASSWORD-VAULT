<script>
    import {
        FileText,
        ShieldAlert,
        AlertTriangle,
        CheckCircle,
    } from "lucide-svelte";

    export let lang = "en";
    $: isVi = lang === "vi";
</script>

<div class="legal-content-container">
    <div class="legal-header">
        <FileText size={48} color="#3b82f6" />
        <h1>{isVi ? "Điều Khoản Sử Dụng" : "Terms of Service"}</h1>
        <p class="last-updated">
            {isVi ? "Cập nhật: 09/03/2026" : "Updated: March 09, 2026"}
        </p>
    </div>

    <div class="legal-body">
        <section>
            <p>
                {isVi
                    ? "Bằng cách sử dụng PocketVault, bạn đồng ý với các điều khoản sau:"
                    : "By using PocketVault, you agree to the following terms:"}
            </p>
        </section>

        <section>
            <div class="icon-text">
                <ShieldAlert size={24} />
                <h2>
                    {isVi
                        ? "1. Trách Nhiệm Mật Khẩu"
                        : "1. Password Responsibility"}
                </h2>
            </div>
            <p>
                {isVi
                    ? " PocketVault KHÔNG lưu trữ Mật khẩu Chính của bạn. Nếu bạn quên, chúng tôi KHÔNG THỂ khôi phục dữ liệu. Bạn chịu trách nhiệm hoàn toàn."
                    : "PocketVault DOES NOT store your Master Password. If lost, we CANNOT recover your data. You are solely responsible."}
            </p>
        </section>

        <section>
            <div class="icon-text">
                <AlertTriangle size={24} />
                <h2>{isVi ? "2. Miễn Trừ Trách Nhiệm" : "2. Disclaimer"}</h2>
            </div>
            <p>
                {isVi
                    ? "PocketVault được cung cấp 'nguyên trạng'. Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất dữ liệu nào phát sinh từ việc sử dụng không đúng cách."
                    : "PocketVault is provided 'as is'. We are not liable for any data loss arising from improper use."}
            </p>
        </section>

        <section>
            <div class="icon-text">
                <CheckCircle size={24} />
                <h2>{isVi ? "3. Sử Dụng Hợp Pháp" : "3. Acceptable Use"}</h2>
            </div>
            <p>
                {isVi
                    ? "Bạn cam kết không sử dụng ứng dụng cho các mục đích bất hợp pháp."
                    : "You agree not to use the application for any illegal purposes."}
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
</style>

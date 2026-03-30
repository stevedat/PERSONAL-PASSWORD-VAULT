<script>
    import TermsContent from "$lib/components/TermsContent.svelte";
    import { language } from "$lib/language";
    import { ArrowLeft } from "lucide-svelte";
    import { darkMode } from "$lib/stores";

    $: isVi = $language === "vi";
</script>

<svelte:head>
    <title
        >{isVi
            ? "Điều Khoản Sử Dụng - PocketVault"
            : "Terms of Service - PocketVault"}</title
    >
</svelte:head>

<div class="standalone-legal {$darkMode ? 'dark' : ''}">
    <nav class="top-nav">
        <a href="/" class="back-link">
            <ArrowLeft size={20} />
            <span>{isVi ? "Về trang chủ" : "Back to App"}</span>
        </a>
    </nav>

    <TermsContent lang={$language} />
</div>

<style>
    .standalone-legal {
        min-height: 100vh;
        background: #f8fafc;
        color: #1e293b;
    }
    .standalone-legal.dark {
        background: #0f172a;
        color: #f1f5f9;
    }
    .top-nav {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }
    .back-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #3b82f6;
        text-decoration: none;
        font-weight: 500;
        width: fit-content;
    }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { account } from '$lib/appwrite';
  import { Cloud, X, LogIn, UserPlus, Mail, Lock, Loader2, LogOut, CheckCircle2 } from 'lucide-svelte';
  import { ID } from 'appwrite';

  const dispatch = createEventDispatcher();

  export let show = false;

  let mode = 'login'; // 'login' | 'register'
  let email = '';
  let password = '';
  let name = '';
  let loading = false;
  let error = '';
  let success = '';

  /** @type {{ $id: string, name: string, email: string } | null} */
  let currentUser = null;

  async function checkSession() {
    try {
      currentUser = await account.get();
    } catch (e) {
      currentUser = null;
    }
  }

  $: if (show) {
    checkSession();
    error = '';
    success = '';
  }

  async function handleLogin() {
    if (!email || !password) {
      error = 'Vui lòng nhập email và mật khẩu';
      return;
    }
    loading = true;
    error = '';
    try {
      await account.createEmailPasswordSession(email, password);
      currentUser = await account.get();
      success = 'Đăng nhập thành công!';
      dispatch('authenticated', currentUser);
      setTimeout(() => { show = false; }, 1200);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Đăng nhập thất bại';
    } finally {
      loading = false;
    }
  }

  async function handleRegister() {
    if (!email || !password) {
      error = 'Vui lòng nhập email và mật khẩu';
      return;
    }
    if (password.length < 8) {
      error = 'Mật khẩu phải có ít nhất 8 ký tự';
      return;
    }
    loading = true;
    error = '';
    try {
      await account.create(ID.unique(), email, password, name || undefined);
      await account.createEmailPasswordSession(email, password);
      currentUser = await account.get();
      success = 'Đăng ký và đăng nhập thành công!';
      dispatch('authenticated', currentUser);
      setTimeout(() => { show = false; }, 1200);
    } catch (e) {
      error = e instanceof Error ? e.message : 'Đăng ký thất bại';
    } finally {
      loading = false;
    }
  }

  async function handleLogout() {
    loading = true;
    try {
      await account.deleteSession('current');
      currentUser = null;
      success = 'Đã đăng xuất';
      dispatch('loggedout');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Đăng xuất thất bại';
    } finally {
      loading = false;
    }
  }

  function close() {
    show = false;
    error = '';
    success = '';
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="cloud-overlay" transition:fade={{ duration: 200 }} on:click|self={close}>
    <div class="cloud-modal glass" transition:fly={{ y: 30, duration: 300 }}>
      <div class="cloud-header">
        <div class="cloud-title">
          <span class="cloud-icon"><Cloud size={22} /></span>
          <h3>Cloud Sync</h3>
        </div>
        <button class="close-btn" on:click={close}>
          <X size={18} />
        </button>
      </div>

      {#if success}
        <div class="cloud-success" transition:fly={{ y: -10, duration: 200 }}>
          <CheckCircle2 size={18} />
          <span>{success}</span>
        </div>
      {/if}

      {#if error}
        <div class="cloud-error" transition:fly={{ y: -10, duration: 200 }}>
          <span>{error}</span>
        </div>
      {/if}

      {#if currentUser}
        <!-- Logged in state -->
        <div class="cloud-user-info">
          <div class="user-avatar">
            {currentUser.name?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()}
          </div>
          <div class="user-details">
            <span class="user-name">{currentUser.name || 'User'}</span>
            <span class="user-email">{currentUser.email}</span>
          </div>
        </div>
        <p class="cloud-desc">
          Tài khoản đã kết nối. Dữ liệu sẽ tự động đồng bộ khi có thay đổi.
        </p>
        <button class="cloud-btn cloud-btn-danger" on:click={handleLogout} disabled={loading}>
          {#if loading}
            <Loader2 size={18} class="spin" />
          {:else}
            <LogOut size={18} />
          {/if}
          <span>Đăng xuất</span>
        </button>
      {:else}
        <!-- Login / Register forms -->
        <div class="cloud-tabs">
          <button
            class="cloud-tab"
            class:active={mode === 'login'}
            on:click={() => { mode = 'login'; error = ''; }}
          >
            <LogIn size={16} />
            <span>Đăng nhập</span>
          </button>
          <button
            class="cloud-tab"
            class:active={mode === 'register'}
            on:click={() => { mode = 'register'; error = ''; }}
          >
            <UserPlus size={16} />
            <span>Đăng ký</span>
          </button>
        </div>

        <form on:submit|preventDefault={mode === 'login' ? handleLogin : handleRegister}>
          {#if mode === 'register'}
            <div class="cloud-field">
              <label for="cloud-name">Tên hiển thị</label>
              <input
                id="cloud-name"
                type="text"
                bind:value={name}
                placeholder="Tên của bạn"
                autocomplete="name"
              />
            </div>
          {/if}

          <div class="cloud-field">
            <label for="cloud-email">
              <Mail size={14} />
              Email
            </label>
            <input
              id="cloud-email"
              type="email"
              bind:value={email}
              placeholder="email@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="cloud-field">
            <label for="cloud-password">
              <Lock size={14} />
              Mật khẩu
            </label>
            <input
              id="cloud-password"
              type="password"
              bind:value={password}
              placeholder="••••••••"
              required
              autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
              minlength="8"
            />
          </div>

          <button class="cloud-btn cloud-btn-primary" type="submit" disabled={loading}>
            {#if loading}
              <Loader2 size={18} class="spin" />
              <span>Đang xử lý...</span>
            {:else if mode === 'login'}
              <LogIn size={18} />
              <span>Đăng nhập</span>
            {:else}
              <UserPlus size={18} />
              <span>Tạo tài khoản</span>
            {/if}
          </button>
        </form>

        <p class="cloud-notice">
          🔒 Dữ liệu được mã hóa AES-GCM trước khi gửi lên cloud.<br/>
          Server chỉ lưu blob đã mã hóa, không thể đọc nội dung.
        </p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .cloud-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 1rem;
  }

  .cloud-modal {
    width: 100%;
    max-width: 420px;
    border-radius: 20px;
    padding: 1.5rem;
    background: rgba(30, 35, 50, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .cloud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .cloud-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cloud-icon {
    display: flex;
    color: #3b82f6;
  }

  .cloud-title h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
    color: #fff;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.08);
    border: none;
    border-radius: 10px;
    padding: 0.4rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  .cloud-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 4px;
  }

  .cloud-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .cloud-tab.active {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
  }

  .cloud-tab:hover:not(.active) {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
  }

  .cloud-field {
    margin-bottom: 1rem;
  }

  .cloud-field label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.4rem;
    font-weight: 500;
  }

  .cloud-field input {
    width: 100%;
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    font-size: 0.9rem;
    outline: none;
    transition: all 0.2s;
    box-sizing: border-box;
  }

  .cloud-field input:focus {
    border-color: rgba(59, 130, 246, 0.5);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .cloud-field input::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }

  .cloud-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.5rem;
  }

  .cloud-btn-primary {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: #fff;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }

  .cloud-btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    transform: translateY(-1px);
  }

  .cloud-btn-danger {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .cloud-btn-danger:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.25);
  }

  .cloud-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .cloud-error {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #f87171;
    padding: 0.6rem 0.8rem;
    border-radius: 10px;
    font-size: 0.82rem;
    margin-bottom: 1rem;
  }

  .cloud-success {
    background: rgba(34, 197, 94, 0.15);
    border: 1px solid rgba(34, 197, 94, 0.2);
    color: #4ade80;
    padding: 0.6rem 0.8rem;
    border-radius: 10px;
    font-size: 0.82rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .cloud-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.15);
    border-radius: 14px;
    margin-bottom: 1rem;
  }

  .user-avatar {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .user-name {
    font-weight: 600;
    color: #fff;
    font-size: 0.95rem;
  }

  .user-email {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cloud-desc {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.82rem;
    margin: 0 0 1rem;
    line-height: 1.5;
  }

  .cloud-notice {
    color: rgba(255, 255, 255, 0.35);
    font-size: 0.75rem;
    text-align: center;
    margin: 1rem 0 0;
    line-height: 1.6;
  }

  /* Spin animation for loader */
  :global(.spin) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Light mode adjustments */
  :global(body:not(.dark-mode)) .cloud-modal {
    background: rgba(255, 255, 255, 0.97);
    border-color: rgba(0, 0, 0, 0.08);
  }

  :global(body:not(.dark-mode)) .cloud-title h3 { color: #1e293b; }
  :global(body:not(.dark-mode)) .close-btn { color: rgba(0,0,0,0.4); }
  :global(body:not(.dark-mode)) .close-btn:hover { color: #1e293b; background: rgba(0,0,0,0.06); }
  :global(body:not(.dark-mode)) .cloud-tab { color: rgba(0,0,0,0.4); }
  :global(body:not(.dark-mode)) .cloud-tab.active { color: #2563eb; background: rgba(59,130,246,0.1); }
  :global(body:not(.dark-mode)) .cloud-field label { color: rgba(0,0,0,0.5); }
  :global(body:not(.dark-mode)) .cloud-field input {
    background: rgba(0,0,0,0.03);
    border-color: rgba(0,0,0,0.1);
    color: #1e293b;
  }
  :global(body:not(.dark-mode)) .cloud-field input::placeholder { color: rgba(0,0,0,0.25); }
  :global(body:not(.dark-mode)) .user-name { color: #1e293b; }
  :global(body:not(.dark-mode)) .user-email { color: rgba(0,0,0,0.45); }
  :global(body:not(.dark-mode)) .cloud-desc { color: rgba(0,0,0,0.45); }
  :global(body:not(.dark-mode)) .cloud-notice { color: rgba(0,0,0,0.35); }
</style>

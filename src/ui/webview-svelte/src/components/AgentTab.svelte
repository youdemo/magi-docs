<script lang="ts">
  import type { Message } from '../types/message';
  import MessageList from './MessageList.svelte';
  import { i18n } from '../stores/i18n.svelte';

  // Props
  interface Props {
    workerName?: 'claude' | 'codex' | 'gemini';
    messages: Message[];
    isActive?: boolean;
  }

  let { workerName, messages, isActive = false }: Props = $props();

  // Worker Tab 专用的空状态配置
  const emptyState = $derived({
    icon: 'message-square',
    title: i18n.t('agentTab.empty.title'),
    hint: i18n.t('agentTab.empty.hint')
  });
</script>

<!-- 复用 MessageList 组件，displayContext='worker' 标识 Worker 面板 -->
<MessageList {workerName} {messages} {emptyState} displayContext="worker" {isActive} />

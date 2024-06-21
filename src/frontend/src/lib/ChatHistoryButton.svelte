<script lang="ts">
  import { goto } from "$app/navigation";
  import { selectedHistoryStore } from "./SelectedHistory.store";
  import { historyStore, type ChatHistory } from "./history.store";
  import { page } from "$app/stores";
  import { TrashBinOutline } from "flowbite-svelte-icons";
  import { Spinner } from "flowbite-svelte";
  import { authStore } from "./auth.store";

  export let chatIdAndHistory: {
    chat_id: string;
    chat_history: ChatHistory;
  };

  let chat_history = chatIdAndHistory.chat_history;
  let { text } = chat_history[chat_history.length - 2].parts[0];
  let headings = text.slice(0, 28);

  //   $: activeUrl = $page.url.pathname;

  export let onClick;

  let activateSpinner = false;
  async function deleteChat() {
    activateSpinner = true;
    await $authStore.actor.delete_chat(chatIdAndHistory.chat_id);
    await historyStore.sync();
  }
</script>

<div class="border rounded-md border-purple-500 p-3 my-1">
  <div class="flex justify-between">
    <button
      on:click={async () => {
        selectedHistoryStore.set(chatIdAndHistory);
        goto("/history");
        onClick();
      }}
    >
      <p class="text-neutral-500 dark:text-neutral-400">
        {headings}
      </p></button
    >
    {#if activateSpinner}
      <div class="flex items-center">
        <Spinner size="4" />
      </div>
    {:else}
      <button on:click={async () => await deleteChat()}>
        <TrashBinOutline />
      </button>
    {/if}
  </div>
</div>

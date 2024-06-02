<script lang="ts">
  import { Textarea, Alert, ToolbarButton } from "flowbite-svelte";
  import {
    PaperPlaneOutline,
    PlusOutline,
  } from "flowbite-svelte-icons";
  import { inputStore } from "./input.store";

  type Function = () => void;
  export let onClick : () => Promise<void>;
  export let onClickPlus;

  let value: string = "";
  $: inputStore.set(value.trim());

  $: buttonDisable = value.trim().length === 0;

  function handleInputChange() {
    blockButtonIfInputIsEmpty();
  }

  function blockButtonIfInputIsEmpty() {
    buttonDisable = value.trim().length === 0;
  }

  async function handleFormSubmit() {
    buttonDisable = true;
    value = "";
    await onClick();
    buttonDisable = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !buttonDisable) {
      event.preventDefault();
      handleFormSubmit();
    }
  }
</script>

<div
  class="@apply fixed bottom-0 left-0 right-0 sm:p-4 z-50 lg:right-36 lg:left-40 xl:right-60 xl:left-60"
>
  <form>
    <label for="chat" class="sr-only">Your message</label>
    <Alert color="dark" class="px-3 py-2">
      <svelte:fragment slot="icon">
        <ToolbarButton
          on:click={async () => await onClickPlus()}
          color="dark"
          class="text-gray-500 dark:text-gray-400"
        >
          <PlusOutline class="w-6 h-6" />
          <span class="sr-only">New Chat</span>
        </ToolbarButton>
        <Textarea
          id="chat"
          class="mx-4"
          rows="1"
          placeholder="Your message..."
          bind:value
          on:input={handleInputChange}
          on:keydown={handleKeyDown}
        />
        <ToolbarButton
          on:click={handleFormSubmit}
          type="submit"
          color="blue"
          class="rounded-full text-primary-600 dark:text-primary-500"
          disabled={buttonDisable}
        >
          <PaperPlaneOutline class="w-6 h-6 rotate-45" />
          <span class="sr-only">Send message</span>
        </ToolbarButton>
      </svelte:fragment>
    </Alert>
  </form>
</div>

<style lang="postcss">
  /* .chat-container { @apply fixed bottom-0 left-0 right-0 p-4 z-50; } */
</style>

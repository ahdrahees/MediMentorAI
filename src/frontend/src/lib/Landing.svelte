<script>
  import { Heading, P, Span } from "flowbite-svelte";
</script>

<div
  class="text-center p-4 sm:p-32 max-sm:pt-20 flex items-center flex-col justify-center h-[100vh]"
>
  <Heading
    tag="h1"
    class="mb-4"
    customSize="text-3xl font-extrabold  md:text-5xl lg:text-6xl"
  >
    Welcome to <Span gradient class="from-purple-600 to-sky-400"
      >MediMentor AI</Span
    > - Your Advanced Medical Education Assistant Discover the power of AI-driven
    learning in medicine.
  </Heading>
  <P
    >MediMentor AI is an AI chat model powered by <Span
      class="from-purple-400 to-sky-600"
      gradient>Gemini Flash</Span
    >, designed to have engaging and informative conversations about medical
    field</P
  >
</div>

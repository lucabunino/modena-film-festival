<script>
    import HeadSingle from '$lib/components/HeadSingle.svelte';
    import Title from '$lib/components/Title.svelte';
    import { formatDateNumber, formatISO } from '$lib/utils/datetime.js';
    import { urlFor } from '$lib/utils/image.js';
	import { enhance } from '$app/forms';

	let { data, form } = $props()
	const seoSingle = { seoTitle: 'Press'}

	let loading = $state(false);
</script>

{#if seoSingle}<HeadSingle seo={data.seo} {seoSingle}/>{/if}

<main class="bg-linen">
	<Title
	title='Press'
	subtitles={[
		"La 1ª edizione del Modena Film Festival, organizzata da Crispy Cinema Club APS e longtake, si è tenuta a Modena dal 15 al 19 aprile 2026. Il Modena Film Festival nasce da una riflessione sul cinema come arte della percezione.",
		"Per accedere al press kit del Modena Film Festival, ti invitiamo a compilare il form qui sotto."
	]}
	size={'m'}
	/>
	<section id="press" class="max-w-700 wb-21">
        <form 
            method="POST" 
            use:enhance={() => {
                loading = true;
                return async ({ result }) => {
                    loading = false;
                    if (result.type === 'success') {
                        window.open(result.data.url, '_blank');
                    }
                };
            }}
        >
            <div class="fields">
                <input type="text" name="name" placeholder="Nome" required class="bg-white" />
                <input type="text" name="surname" placeholder="Cognome" required class="bg-white" />
                <input type="email" name="email" placeholder="Email" required class="bg-white" />
            </div>

            <button type="submit" class="btn-l bg-black white hover-bg-white hover-black" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Vai al press kit'}
            </button>

            {#if form?.error}
                <p class="error">{form.error}</p>
            {/if}
        </form>
    </section>
</main>

<style>
main {
	row-gap: 0;
	
	#press {
		padding-top: var(--spacing-xs);
		
		form {
			.fields {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: .2em;

				@media screen and (max-width: 600px) {
					display: flex;
					flex-direction: column;
				}

				input {
					border: none;
					padding: .5em 1em;
				}

				input[type="email"] {
					grid-column: span 2;
				}
			}
			
			button[type="submit"] {
				display: block;
				margin-top: var(--spacing-xs);
			}
		}
	}
}
</style>
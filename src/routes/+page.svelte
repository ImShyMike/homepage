<div class="space-y-8">
	<section class="text-center">
		<h1 class="text-ctp-text mb-4 text-4xl font-bold">
			Hi, I'm <span class="text-ctp-accent text-glow">shymike</span>
		</h1>
		<p class="text-ctp-subtext0 mx-auto max-w-4xl text-lg">
			Student who likes coding and gaming :D
		</p>
	</section>

	<section class="text-center">
		<p>This page is still kinda WIP will finish later D:</p>
		<p>Until the page is finished, have a cat picture:</p>
		<img
			src="https://cataas.com/cat"
			alt="A cute cat"
			class="mx-auto mt-4 rounded-lg shadow-lg"
			width="400"
			height="400"
		/>
		<br />
		<button
			onclick={() => {
				const img = document.querySelector('img');
				if (img) {
					img.src = `https://cataas.com/cat?${new Date().getTime()}`;
				}
			}}
		>
			I want another cat picture!
		</button>
	</section>
</div>

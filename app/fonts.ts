import { Plus_Jakarta_Sans, Crimson_Pro , JetBrains_Mono,  } from 'next/font/google'; // alternative is 'next/font/local' if you have font

export const jakartaSans = Plus_Jakarta_Sans({
   subsets: ['latin'],
   variable: '--font-jakarta'
});

export const crimson_pro = Crimson_Pro({
   subsets: ['latin'],
   variable: '--font-crimson-pro'
})

export const jetbrains_mono = JetBrains_Mono({
   subsets: ['latin'],
   variable: '--font-jetbrains-mono'
})


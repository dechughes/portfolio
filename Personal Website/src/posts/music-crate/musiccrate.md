
## 1. The idea

Streaming is convenient, but it flattens how we discover music. Everything lives in the same list, at the same size, with the same weight.This project was an attmept to see if I could recreate the record shop experience in a browser interface - make it feel a bit more physical and human. I centred it around albums from the Soulquarians: a loosely defined movement, short-lived and not especially commercial, but with some great output

---

## 2. Inspiration & References

My main references were record shops and cafés I’ve visited in real life. I’ve always found it interesting how they use fairly low-fi materials to deliver a high-end experience – worn wood, stickers, hand-written signs – and still feel considered.

I wasn’t trying to recreate a real crate exactly, but I did borrow a few ideas:

- Engraved or wood-burned lettering rather than clean typography  
- Stickers and markings that imply history rather than branding  
- Slight imperfections and misalignment  
- The idea that records sit *inside* something, not just on top of a surface  

Posters from the Soulquarians era, late-’90s design, and early music websites also fed into this.

---

## 3. Design Challenges

The biggest challenge was making a flat web interface feel physical without turning it into a gimmick.

A surprising amount of time went into things that look simple on the surface:

- Getting records to feel like they sit in the crate rather than floating above it  
- Layering the crate front and back so the depth made sense  
- Making sure the selected album stayed visually prominent when everything else dimmed  
- Tuning animation timing so movements felt weighted, not snappy or “toy-like”  

Small changes made a big difference. A few pixels too far, a transition that was slightly too fast, or the wrong easing curve and the illusion completely fell apart.

A lot of the work was subtractive – removing effects that felt clever but distracted from the interaction.

---

## 4. Technical Approach (High Level)

Under the hood, the project is deliberately simple:

- HTML and CSS handle most of the visual layering  
- JavaScript manages selection state and interaction flow  
- A separate “hero” layer pulls selected records out of the dimmed scene so they stay fully lit  
- Audio previews are included to set context  
- Animations rely on easing curves that mimic friction and weight rather than speed  

This project was deliberately constrained to what I could build myself - HTML, CSS, and JavaScript, with AI used to bridge gaps rather than replace the thinking. The goal was to turn an idea into something real, and learn through the process rather than chase technical purity.

---

## 5. What I Learned

A few things really stood out:

- Tiny interaction tweaks massively change how something is perceived  
- Visual feedback matters – hover states, playback indicators, selection cues  
- Small hitboxes are not your friend, no matter how “correct” they seem in theory  
- Designing without constraints makes it easy to overreach and never ship  
- An MVP is better than a perfect idea that never leaves your head  

This project took longer than expected because the final 10% – where things stop feeling mechanical – is where most of the work actually lives.

---

## 6. What’s Next

This is version one.

There’s room to:

- Add more albums and stories  
- Make it usable beyond a laptop screen  
- Expand the written context around each record  
- Explore whether this could grow into a wider interactive music project  

For now, I’m happy to leave it as a small, self-contained piece – a focused experiment in interaction, storytelling and restraint.


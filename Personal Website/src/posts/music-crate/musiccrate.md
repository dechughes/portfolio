
## 1. The idea

Streaming is great for convenience, but it flattens the experience of finding music. Everything lives in the same list, at the same size, with the same weight. This project was an attempt to see if I could recreate the record shop experience in a browser interface and make it feel a bit more physical and human. I centred it around albums from the Soulquarians: a loosely defined group, short-lived but with some great output.

**Link to project**: https://musiccrate.netlify.app/

While creating this project I learned that the approach I was taking actually has a name: Skeuomorphism[^1]. In future projects, I'd like to continue to explore how interface design could change the way people discover and engage with music, making the experience less about passive consumption and more about the act of engaging with it.


---

## 2. Inspiration & References

A lot of the inspiration came from real record shops and cafés I’ve spent time in. I’ve always found it interesting how these places use fairly low-fi materials to deliver a high-end experience – worn wood, stickers, hand-written signs – and still feel considered.

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

- Making records feel like they actually sit in the crate 
- Layering the crate so the depth reads correctly
- Keeping the selected album visually dominant when everything else dims  
- Tuning animation timing so movements felt weighted, not snappy or “toy-like”  

Small changes made a big difference. A few pixels too far, a transition that was slightly too fast, or the wrong easing curve and the illusion completely fell apart.

A lot of the work ended up being subtractive: removing clever touches that didn’t actually help the interaction.

---

## 4. Technical Approach (High Level)

Under the hood, the project is deliberately simple:

- HTML and CSS handle most of the visual layering  
- JavaScript manages selection state and interaction flow  
- A separate “hero” layer pulls selected records out of the dimmed scene so they stay fully lit  
- Audio previews are included to set context  
- Animations rely on easing curves that mimic friction and weight rather than speed  

This project was deliberately constrained to what I could build myself - HTML, CSS, and JavaScript, with AI used to bridge gaps rather than replace the thinking. The goal was to turn an idea into something real, and learn through the process rather than chase technical purity.

# Constraints
This version is designed for a 1920 × 1080 desktop view, where the perspective and depth work best. Mobile and responsive layouts are still on the “future iteration” list.

---

## 5. What I Learned

A few things really stood out:

- Tiny interaction tweaks completely change how something feels
- Visual feedback matters – hover states, playback indicators, selection cues  
- Small hitboxes are a bad idea, even if they seem “correct” on paper 
- Designing without constraints makes it easy to overreach and never ship  
- An MVP is better than a perfect idea that never leaves your head
- The last 10% - the part where things stop feeling mechanical - is where most of the work actually happens
- Interaction design doesn’t just affect usability; it shapes behaviour and attention

---

## 6. What’s Next

This is version one.

There’s room to:

- Add more albums and stories  
- Make it usable beyond a laptop screen  
- Expand the written context around each record  
- Explore whether this could grow into a wider interactive music project
- Test how different interaction patterns change browsing behaviour

For now, I’m happy to leave it as a small, self-contained piece – a focused experiment in interaction, storytelling and restraint.

[^1]: Skeuomorphism: a design style where digital items are made to resemble real-world counterparts.

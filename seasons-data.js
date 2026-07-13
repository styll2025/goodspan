// GoodSpan Seasons, practice catalogue
// Each practice: { level: 'gentle'|'moderate'|'deep'|'all', text, insight }

export const LEVELS = [
  {
    id: 'gentle',
    name: 'Gentle',
    summary: 'A soft entry into the season',
    desc: 'Small, achievable shifts. Build the habit without pressure and let it settle into your days.',
  },
  {
    id: 'moderate',
    name: 'Moderate',
    summary: 'A meaningful step up',
    desc: 'Consistent daily practice and a real commitment to change across the full thirty days.',
  },
  {
    id: 'deep',
    name: 'Deep',
    summary: 'Full, documented commitment',
    desc: 'Transformative practice, tracked, refined, and shared openly with your Circle.',
  },
];

export const SEASONS = [
  {
    id: 'sleep',
    name: 'GoodSleep',
    tagline: 'Rest as the foundation of a long life',
    blurb: 'Rebuild the rhythm, calm, and darkness your body needs to recover each night.',
    accent: 'oklch(0.4 0.09 158)',
    accent2: 'oklch(0.48 0.115 150)',
    soft: 'oklch(0.95 0.05 155)',
    note: 'These practices build healthier sleep habits in the general population — they are not a treatment for diagnosed insomnia. If you live with a sleep disorder, treat this as a complement to professional care, not a replacement.',
    categories: [
      {
        name: 'Circadian Alignment',
        families: [
          {
            name: 'Morning Light',
            insight: 'Light in the first part of the day is the strongest signal for setting your body clock and shifting sleep earlier.',
            levels: { gentle: '5 min outdoors within 1 hour of waking', moderate: '10–15 min outdoors', deep: '20–30 min outdoors' },
            science: {
              why: 'Light in the first part of the day is the strongest signal for setting the circadian clock and advancing sleep timing earlier.',
              research: 'Morning and daytime light exposure advances circadian phase and supports earlier, more consolidated sleep, and a systematic review confirms that light in the late biological night and early morning advances the clock. An international expert consensus recommends a daytime minimum of roughly 250 lux melanopic EDI at eye level, a level usually only reached outdoors or near a window rather than under typical indoor lighting.',
              sources: [
                { text: 'Tähkämö, L., Partonen, T., & Pesonen, A.-K. (2019). Systematic review of light exposure impact on human circadian rhythm. Chronobiology International, 36(2), 151–170.', url: 'https://doi.org/10.1080/07420528.2018.1527773' },
                { text: 'Brown, T. M., et al. (2022). Recommendations for daytime, evening, and nighttime indoor light exposure to best support physiology, sleep, and wakefulness in healthy adults. PLOS Biology, 20(3), e3001571.', url: 'https://doi.org/10.1371/journal.pbio.3001571' },
              ],
            },
          },
          {
            name: 'Regular Sleep Schedule',
            insight: 'The body sleeps best when bedtime and wake time are predictable, and regularity matters for long-term health on its own.',
            levels: { gentle: 'Bedtime within a 60-minute window', moderate: 'Bedtime and wake time within 45 min', deep: 'Bedtime and wake time within 30 min, including weekends' },
            science: {
              why: 'The body sleeps best when bedtime and wake time are predictable, and regularity appears to matter for long-term health independently of how long you sleep.',
              research: 'A systematic review found that later and more variable sleep timing is generally associated with worse health outcomes. A large prospective cohort study using accelerometer data from roughly 61,000 UK Biobank participants found that sleep regularity was a stronger predictor of all-cause mortality than sleep duration, with the most regular sleepers showing a markedly lower mortality risk than the least regular.',
              sources: [
                { text: 'Chaput, J.-P., et al. (2020). Sleep timing, sleep consistency, and health in adults: A systematic review. Applied Physiology, Nutrition, and Metabolism, 45(10, Suppl. 2), S232–S247.', url: 'https://doi.org/10.1139/apnm-2020-0032' },
                { text: 'Windred, D. P., et al. (2024). Sleep regularity is a stronger predictor of mortality risk than sleep duration: A prospective cohort study. Sleep, 47(1), zsad253.', url: 'https://doi.org/10.1093/sleep/zsad253' },
              ],
            },
          },
          {
            name: 'Dim Evening Light',
            insight: 'Bright light in the evening suppresses melatonin and pushes your body clock later.',
            levels: { gentle: 'Dim lights 1 hour before bed', moderate: 'Avoid bright overhead lights 2 hours before bed', deep: 'Create a low-light evening routine' },
            science: {
              why: 'Bright light in the evening suppresses melatonin and pushes the circadian clock later.',
              research: 'A systematic review with meta-analysis found that higher evening light levels measurably alter polysomnographically assessed sleep. Experimental work shows the circadian system is highly sensitive to evening light, with roughly half of melatonin suppression occurring below 30 lux — comparable to ordinary indoor and device light — and more than a 50-fold difference in sensitivity between individuals. The expert consensus recommends keeping evening light below roughly 10 lux melanopic EDI in the hours before bed.',
              sources: [
                { text: 'Cajochen, C., et al. (2022). Influence of evening light exposure on polysomnographically assessed night-time sleep: A systematic review with meta-analysis. Lighting Research & Technology, 54(6), 609–624.', url: 'https://doi.org/10.1177/14771535221078765' },
                { text: 'Phillips, A. J. K., et al. (2019). High sensitivity and interindividual variability in the response of the human circadian system to evening light. PNAS, 116(24), 12019–12024.', url: 'https://doi.org/10.1073/pnas.1901824116' },
              ],
            },
          },
        ],
      },
      {
        name: 'Sleep Pressure',
        families: [
          {
            name: 'Daily Movement',
            insight: 'Physical activity builds the sleep pressure that helps you fall and stay asleep.',
            levels: { gentle: '20-min walk', moderate: '30 min moderate activity', deep: 'Meet WHO activity guidelines' },
            science: {
              why: 'Physical activity builds homeostatic sleep pressure and improves sleep quality over time.',
              research: 'A meta-analytic review found that regular exercise has small beneficial effects on total sleep time and sleep efficiency, small-to-medium benefits for sleep onset latency, and moderate benefits for overall sleep quality, with consistency mattering more than intensity. The WHO 2020 guidelines recommend at least 150 to 300 minutes of moderate activity per week for adults.',
              sources: [
                { text: 'Kredlow, M. A., et al. (2015). The effects of physical activity on sleep: A meta-analytic review. Journal of Behavioral Medicine, 38(3), 427–449.', url: 'https://doi.org/10.1007/s10865-015-9617-6' },
                { text: 'Bull, F. C., et al. (2020). World Health Organization 2020 guidelines on physical activity and sedentary behaviour. British Journal of Sports Medicine, 54(24), 1451–1462.', url: 'https://doi.org/10.1136/bjsports-2020-102955' },
              ],
            },
          },
          {
            name: 'Caffeine Timing',
            insight: 'Caffeine blocks adenosine, the molecule that builds sleep pressure, and lingers long after its lift fades.',
            levels: { gentle: 'No caffeine after 4pm', moderate: 'No caffeine after 2pm', deep: 'Adjust intake to your bedtime' },
            science: {
              why: 'Caffeine blocks adenosine, the molecule that builds sleep pressure across the day, and it lingers long after its alerting effect fades.',
              research: 'A systematic review and meta-analysis of 24 studies found that caffeine reduced total sleep time by approximately 45 minutes and sleep efficiency by about 7 percent, increased sleep onset latency by roughly 9 minutes, and reduced deep sleep. To avoid disruption, a standard coffee (around 107 mg) should be consumed at least roughly 9 hours before bed, though the wide variation in caffeine half-life between people (2 to 10 hours) means individuals should adjust to their own response.',
              sources: [
                { text: 'Gardiner, C., et al. (2023). The effect of caffeine on subsequent sleep: A systematic review and meta-analysis. Sleep Medicine Reviews, 69, 101764.', url: 'https://doi.org/10.1016/j.smrv.2023.101764' },
                { text: 'Drake, C., et al. (2013). Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. Journal of Clinical Sleep Medicine, 9(11), 1195–1200.', url: 'https://doi.org/10.5664/jcsm.3170' },
              ],
            },
          },
          {
            name: 'Naps',
            insight: 'Short, early naps restore alertness without eroding the sleep pressure you need at night.',
            levels: { gentle: 'Nap under 30 min', moderate: 'Nap before 3pm', deep: 'Nap only when needed' },
            science: {
              why: 'Short, early naps can restore alertness without eroding nighttime sleep pressure.',
              research: 'A review of epidemiological and laboratory studies concluded that short daytime naps improve alertness and mood, while longer or late-afternoon naps can reduce the drive for nighttime sleep. Benefits are most reliable when naps are kept brief and taken earlier in the day.',
              sources: [
                { text: 'Faraut, B., et al. (2017). Napping: A public health issue. From epidemiological to laboratory studies. Sleep Medicine Reviews, 35, 85–100.', url: 'https://doi.org/10.1016/j.smrv.2016.09.002' },
              ],
            },
          },
        ],
      },
      {
        name: 'Wind Down',
        families: [
          {
            name: 'Slow Breathing',
            insight: 'Slow, controlled breathing shifts the body toward its calming parasympathetic state before sleep.',
            levels: { gentle: '2 min before bed', moderate: '5 min before bed', deep: '10 min before bed' },
            science: {
              why: 'Slow, controlled breathing shifts the autonomic balance toward the parasympathetic system, lowering pre-sleep arousal.',
              research: 'Slow breathing reliably increases heart rate variability and reduces physiological arousal. A systematic review of slow breathing before bed found that self-reported sleep duration and quality tend to improve, while objective sleep findings remain inconclusive — a low-risk practice with promising but not definitive evidence.',
              sources: [
                { text: 'Kuula, L., et al. (2020). The effects of presleep slow breathing and music listening on polysomnographic sleep measures: A pilot trial. Scientific Reports, 10, 7427.', url: 'https://doi.org/10.1038/s41598-020-64218-7' },
                { text: 'Eide, E. M., Hernes, H. M., & Grønli, J. (2026). Slow breathing techniques before bedtime and the effects on sleep: A systematic review. Sleep Medicine Reviews, 87, 102284.', url: 'https://doi.org/10.1016/j.smrv.2026.102284' },
              ],
            },
          },
          {
            name: 'Progressive Muscle Relaxation',
            insight: 'Tensing and releasing muscle groups lowers physical tension and arousal before sleep.',
            levels: { gentle: '5 min', moderate: '10 min', deep: 'Full nightly routine' },
            science: {
              why: 'Systematically tensing and releasing muscle groups lowers physical tension and autonomic arousal before sleep.',
              research: 'A controlled study found that progressive muscle relaxation increased restorative slow-wave sleep during a daytime nap. A recent systematic review and meta-analysis of 31 randomised controlled trials (roughly 2,277 participants) reported a significant improvement in sleep quality alongside reductions in anxiety, though heterogeneity across trials was high. Relaxation-based techniques are endorsed as a single-component therapy in the AASM clinical practice guideline.',
              sources: [
                { text: 'Simon, K. C., et al. (2022). Progressive muscle relaxation increases slow-wave sleep during a daytime nap. Journal of Sleep Research, 31(5), e13574.', url: 'https://doi.org/10.1111/jsr.13574' },
                { text: 'Donato, K. O., et al. (2026). Progressive muscle relaxation technique improves sleep quality and mental health: A systematic review and meta-analysis of randomized controlled trials. Journal of Psychosomatic Research, 203, 112563.', url: 'https://doi.org/10.1016/j.jpsychores.2026.112563' },
              ],
            },
          },
          {
            name: 'Brain Dump / Tomorrow List',
            insight: 'Writing down tomorrow’s tasks stops the mind rehearsing them at bedtime.',
            levels: { gentle: 'Write one task', moderate: 'Top 3 priorities', deep: '5-minute cognitive offload' },
            science: {
              why: 'Writing down tomorrow’s tasks stops the mind rehearsing them at bedtime.',
              research: 'In a polysomnography study of 57 adults, participants who spent five minutes writing a specific to-do list before bed fell asleep faster than those who journaled about completed tasks, and the more specific the list, the faster they fell asleep. This is a single well-controlled experiment rather than a meta-analysis, so the effect is promising but not yet replicated at scale.',
              sources: [
                { text: 'Scullin, M. K., et al. (2018). The effects of bedtime writing on difficulty falling asleep: A polysomnographic study comparing to-do lists and completed activity lists. Journal of Experimental Psychology: General, 147(1), 139–146.', url: 'https://doi.org/10.1037/xge0000374' },
              ],
            },
          },
          {
            name: 'Relaxing Music',
            insight: 'Calming music lowers arousal and can ease the transition into sleep.',
            levels: { gentle: '5 min', moderate: '10 min', deep: 'Full sleep playlist' },
            science: {
              why: 'Calming music lowers arousal and can ease the transition into sleep.',
              research: 'A Cochrane systematic review found evidence that listening to music can improve subjective sleep quality in adults with insomnia symptoms, while noting that the effect on objective sleep parameters is less clear and more research is needed. Music works best as part of a consistent wind-down routine.',
              sources: [
                { text: 'Jespersen, K. V., et al. (2022). Listening to music for insomnia in adults. Cochrane Database of Systematic Reviews, 2022(8), CD010459.', url: 'https://doi.org/10.1002/14651858.CD010459.pub3' },
              ],
            },
          },
        ],
      },
      {
        name: 'Sleep Environment',
        families: [
          {
            name: 'Cool Bedroom',
            insight: 'Core body temperature falls as you prepare for sleep, and an overheated room works against that.',
            levels: { gentle: 'Comfortable temperature', moderate: '18–20°C if possible', deep: 'Optimise consistently' },
            science: {
              why: 'Core body temperature falls as you prepare for sleep, and an overheated room works against that.',
              research: 'A longitudinal field study in community-dwelling older adults found that sleep was most efficient when nighttime bedroom temperature was roughly 20 to 25°C, with a clinically meaningful 5 to 10 percent drop in sleep efficiency as the room warmed from 25 to 30°C, and substantial variation between individuals. The defensible message is to keep the room cool and comfortable and above all avoid overheating, with the exact set point being individual.',
              sources: [
                { text: 'Baniassadi, A., et al. (2023). Nighttime ambient temperature and sleep in community-dwelling older adults. Science of the Total Environment, 899, 165623.', url: 'https://doi.org/10.1016/j.scitotenv.2023.165623' },
              ],
            },
          },
          {
            name: 'Dark Bedroom',
            insight: 'Even low light can interfere with melatonin and disrupt circadian timing.',
            levels: { gentle: 'Close curtains', moderate: 'Remove light sources', deep: 'Complete darkness' },
            science: {
              why: 'Even low light can interfere with melatonin and disrupt circadian timing.',
              research: 'The expert consensus recommends keeping the sleep environment as dark as possible, below roughly 1 lux melanopic EDI, since evening and night light suppress melatonin and shift the clock. Blackout curtains or an eye mask can make a meaningful difference.',
              sources: [
                { text: 'Brown, T. M., et al. (2022). Recommendations for daytime, evening, and nighttime indoor light exposure in healthy adults. PLOS Biology, 20(3), e3001571.', url: 'https://doi.org/10.1371/journal.pbio.3001571' },
                { text: 'Cajochen, C., et al. (2022). Influence of evening light exposure on polysomnographically assessed night-time sleep. Lighting Research & Technology, 54(6), 609–624.', url: 'https://doi.org/10.1177/14771535221078765' },
              ],
            },
          },
          {
            name: 'Quiet Bedroom',
            insight: 'The brain keeps processing sound during sleep, so noise fragments it even without fully waking you.',
            levels: { gentle: 'Reduce one noise source', moderate: 'Earplugs or white noise', deep: 'Consistent quiet environment' },
            science: {
              why: 'The brain continues to process sound during sleep, so noise fragments it even when it does not fully wake you.',
              research: 'A WHO systematic review and meta-analysis of 74 studies found that environmental noise increases awakenings and self-reported sleep disturbance, reducing sleep continuity and time in deep and REM sleep. Earplugs or white noise can help where the noise source itself cannot be removed.',
              sources: [
                { text: 'Basner, M., & McGuire, S. (2018). WHO Environmental Noise Guidelines for the European Region: A systematic review on environmental noise and effects on sleep. International Journal of Environmental Research and Public Health, 15(3), 519.', url: 'https://doi.org/10.3390/ijerph15030519' },
              ],
            },
          },
          {
            name: 'Bed = Sleep',
            insight: 'The brain learns to associate the bed with whatever it is repeatedly used for.',
            levels: { gentle: 'No phone in bed', moderate: 'No work in bed', deep: 'Bed only for sleep' },
            science: {
              why: 'The brain learns to associate the bed with whatever it is repeatedly used for.',
              research: 'Stimulus control — the practice of reserving the bed for sleep — is recommended as a single-component therapy in the AASM clinical practice guideline, which was built on a GRADE-assessed systematic review and meta-analysis. Working, scrolling, or watching television in bed weakens the bed–sleep association over time.',
              sources: [
                { text: 'Edinger, J. D., et al. (2021). Behavioral and psychological treatments for chronic insomnia disorder in adults: An AASM clinical practice guideline. Journal of Clinical Sleep Medicine, 17(2), 255–262.', url: 'https://doi.org/10.5664/jcsm.8986' },
              ],
            },
          },
          {
            name: 'Alcohol Timing',
            insight: 'Alcohol can speed sleep onset but degrades sleep quality later in the night.',
            levels: { gentle: 'Alcohol-free 2h before bed', moderate: 'Alcohol-free 3h before bed', deep: 'Skip alcohol on weekdays' },
            science: {
              why: 'Alcohol can speed sleep onset but degrades sleep quality later in the night.',
              research: 'A systematic review and meta-analysis of 27 controlled studies found that alcohol disrupts REM sleep in a dose-dependent way, delaying its onset and reducing its duration even at low doses of around two standard drinks, and worsening with higher doses. Higher doses shorten sleep onset latency, but at the cost of greater REM disruption, so alcohol is not an appropriate sleep aid.',
              sources: [
                { text: 'Gardiner, C. L., et al. (2025). The effect of alcohol on subsequent sleep in healthy adults: A systematic review and meta-analysis. Sleep Medicine Reviews, 80, 102030.', url: 'https://doi.org/10.1016/j.smrv.2024.102030' },
              ],
            },
          },
        ],
      },
      {
        name: 'Social Accountability',
        families: [
          {
            name: 'Share Tomorrow’s Goal',
            insight: 'Deciding in advance exactly what you will do, and committing to it, makes follow-through more likely.',
            levels: { gentle: 'Share one sleep intention', moderate: 'Share your bedtime target', deep: 'Review together the next day' },
            science: {
              why: 'Deciding in advance exactly what you will do, and committing to it, makes follow-through more likely.',
              research: 'A meta-analysis of 94 independent tests found that forming implementation intentions — specific if-then plans linking a behaviour to a cue — had a medium-to-large effect on goal attainment. Meta-reviews of health behaviour change similarly identify goal setting, commitment, and monitoring among the more effective techniques.',
              sources: [
                { text: 'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69–119.', url: 'https://doi.org/10.1016/S0065-2601(06)38002-1' },
                { text: 'Hennessy, E. A., et al. (2020). Self-regulation mechanisms in health behavior change: A systematic meta-review of meta-analyses, 2006–2017. Health Psychology Review, 14(1), 6–42.', url: 'https://doi.org/10.1080/17437199.2019.1679654' },
              ],
            },
          },
          {
            name: 'Celebrate Progress',
            insight: 'Feedback on progress reinforces new habits and sustains motivation.',
            levels: { gentle: 'Congratulate one teammate', moderate: 'Celebrate weekly wins', deep: 'Build a shared streak' },
            science: {
              why: 'Feedback on progress reinforces new habits and sustains motivation.',
              research: 'Reviews of behaviour change consistently find that feedback and self-monitoring are among the most frequently used and effective techniques, and that acknowledging progress strengthens motivation. An umbrella review of digital health interventions reached the same conclusion across a large pooled evidence base.',
              sources: [
                { text: 'Mair, J. L., et al. (2023). Effective behavior change techniques in digital health interventions for the prevention or management of noncommunicable diseases: An umbrella review. Annals of Behavioral Medicine, 57(10), 817–835.', url: 'https://doi.org/10.1093/abm/kaad041' },
                { text: 'Hennessy, E. A., et al. (2020). Self-regulation mechanisms in health behavior change: A systematic meta-review of meta-analyses, 2006–2017. Health Psychology Review, 14(1), 6–42.', url: 'https://doi.org/10.1080/17437199.2019.1679654' },
              ],
            },
          },
          {
            name: 'Reflect Together',
            insight: 'Reviewing what worked helps people learn from experience and stay engaged.',
            levels: { gentle: 'Share one thing that helped', moderate: 'Share one lesson learned', deep: 'Weekly Circle reflection' },
            science: {
              why: 'Reviewing what worked helps people learn from experience and stay engaged.',
              research: 'Self-monitoring and reflection are core components of effective behaviour change, and a meta-review of self-regulatory techniques across diet, activity, and weight outcomes (drawing on 30 meta-analyses and more than 400,000 participants) found goal setting and self-monitoring to be among the most examined and useful techniques. Sharing reflections adds accountability.',
              sources: [
                { text: 'Spring, B., et al. (2020). Self-regulatory behaviour change techniques in interventions to promote healthy eating, physical activity, or weight loss: A meta-review. Health Psychology Review, 15(4), 508–539.', url: 'https://doi.org/10.1080/17437199.2020.1721310' },
                { text: 'Hennessy, E. A., et al. (2020). Self-regulation mechanisms in health behavior change: A systematic meta-review of meta-analyses, 2006–2017. Health Psychology Review, 14(1), 6–42.', url: 'https://doi.org/10.1080/17437199.2019.1679654' },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'eat',
    name: 'GoodEat',
    tagline: 'Eat for energy, rhythm, and connection',
    blurb: 'Nourish well, find a steady eating rhythm, and bring presence and people back to the table.',
    accent: 'oklch(0.62 0.2 47)',
    accent2: 'oklch(0.68 0.2 55)',
    soft: 'oklch(0.955 0.055 60)',
    categories: [
      {
        name: 'Nourish',
        evidence: 'What you eat shapes long-term metabolic health; protein, plants and minimally processed foods do the heaviest lifting.',
        practices: [
          { level: 'gentle', text: 'Add a source of protein to every main meal', insight: 'Protein at each meal preserves muscle as you age and keeps you fuller for longer.' },
          { level: 'gentle', text: 'Eat two portions of vegetables today', insight: 'Higher vegetable intake is linked to lower risk of heart disease and all-cause mortality.' },
          { level: 'gentle', text: 'Replace one ultra-processed snack with fruit or nuts', insight: 'Swapping ultra-processed snacks cuts excess salt, sugar and additives tied to poorer health.' },
          { level: 'gentle', text: 'Drink water before each meal', insight: 'Water before meals aids satiety and stops thirst being mistaken for hunger.' },
          { level: 'moderate', text: 'Build every lunch around protein and vegetables', insight: 'Protein-and-vegetable meals steady blood sugar and curb the afternoon energy crash.' },
          { level: 'moderate', text: 'Include legumes or whole grains three times this week', insight: 'Legumes and whole grains feed gut bacteria and help lower cholesterol and inflammation.' },
          { level: 'moderate', text: 'Reach your personal daily protein target', insight: 'Meeting a protein target protects against age-related muscle loss (sarcopenia).' },
          { level: 'moderate', text: 'Eat 20 different plant foods during the week', insight: 'Plant diversity is the strongest dietary predictor of a healthy, varied gut microbiome.' },
          { level: 'deep', text: 'Plan all weekday lunches and dinners in advance', insight: 'Planning meals reduces reliance on convenience food and improves overall diet quality.' },
          { level: 'deep', text: 'Avoid ultra-processed foods for five consecutive days', insight: 'Cutting ultra-processed foods quickly lowers calorie intake and improves metabolic markers.' },
          { level: 'deep', text: 'Prioritise seasonal and minimally processed ingredients', insight: 'Minimally processed, seasonal foods retain more nutrients and carry fewer additives.' },
          { level: 'deep', text: 'Keep a simple food journal for the entire week', insight: 'Simply recording what you eat raises awareness and supports lasting dietary change.' },
        ],
      },
      {
        name: 'Rhythm',
        evidence: 'When you eat matters too: a regular eating window aligns your metabolism with your circadian clock.',
        practices: [
          { level: 'gentle', text: 'Eat breakfast (or your first meal) at a consistent time', insight: 'Eating on a regular schedule helps align your metabolism with your body clock.' },
          { level: 'gentle', text: 'Avoid eating after 10pm', insight: 'Late-night eating works against your circadian rhythm and is linked to poorer metabolic health.' },
          { level: 'gentle', text: 'Sit down for every main meal', insight: 'Sitting to eat slows the meal and supports better digestion and fullness signalling.' },
          { level: 'gentle', text: 'Leave at least 2 hours between dinner and sleep', insight: 'A gap before bed lets digestion settle and protects your sleep quality.' },
          { level: 'moderate', text: 'Keep a consistent 12-hour eating window', insight: 'A steady eating window gives the gut a nightly rest and supports metabolic health.' },
          { level: 'moderate', text: 'Avoid unnecessary snacking between meals', insight: 'Fewer eating occasions steady insulin and let the body burn fat between meals.' },
          { level: 'moderate', text: 'Eat lunch before 2pm', insight: 'Eating the main meal earlier is associated with better weight and glucose control.' },
          { level: 'moderate', text: 'Finish dinner at roughly the same time every day', insight: 'A regular dinner time reinforces your circadian rhythm and overnight metabolism.' },
          { level: 'deep', text: 'Maintain your chosen eating window for 30 days', insight: 'Sustained time-restricted eating can improve blood sugar, lipids and energy over weeks.' },
          { level: 'deep', text: 'Avoid food within 3 hours of bedtime', insight: 'An early last meal aligns digestion with your body clock and deepens sleep.' },
          { level: 'deep', text: "Plan your week's meal schedule every Sunday", insight: 'Weekly planning smooths your eating rhythm and removes daily decision fatigue.' },
          { level: 'deep', text: 'Reserve one meal each week for slow, uninterrupted eating', insight: 'Slow, unhurried eating improves digestion and helps you recognise fullness.' },
          { level: 'deep', text: 'Intermittent fasting 5 times per week or more', insight: 'Regular fasting periods may improve insulin sensitivity and cellular repair (autophagy).' },
        ],
      },
      {
        name: 'Presence',
        evidence: 'Eating slowly and without distraction improves digestion and lets fullness signals reach the brain in time.',
        practices: [
          { level: 'gentle', text: 'Eat one meal each day without your phone', insight: 'Phone-free meals slow eating and reduce the mindless overeating that distraction drives.' },
          { level: 'gentle', text: 'Take one deep breath before eating', insight: 'A pause before eating shifts you into “rest-and-digest” mode for better digestion.' },
          { level: 'gentle', text: 'Spend at least 20 minutes on one meal', insight: 'Eating more slowly gives fullness signals time to reach the brain, reducing overeating.' },
          { level: 'gentle', text: 'Notice one flavour you normally overlook', insight: 'Paying attention to taste increases meal satisfaction and curbs the urge for more.' },
          { level: 'moderate', text: 'Eat every dinner without screens', insight: 'Screen-free dinners improve portion awareness and the quality of mealtime connection.' },
          { level: 'moderate', text: 'Stop eating when comfortably satisfied rather than full', insight: 'Tuning into satiety, not the plate, naturally calibrates your portion size.' },
          { level: 'moderate', text: 'Chew slowly during the first five minutes of each meal', insight: 'Thorough chewing aids digestion and slows the meal enough to register fullness.' },
          { level: 'moderate', text: 'Express gratitude for one aspect of your meal', insight: 'Savouring and gratitude at meals heighten enjoyment and reduce stress eating.' },
          { level: 'deep', text: 'Practice mindful eating for one meal every day', insight: 'Mindful eating is shown to reduce binge episodes and emotional eating.' },
          { level: 'deep', text: 'Create a pleasant table setting even when eating alone', insight: 'A cared-for setting turns eating into a ritual that supports slower, calmer meals.' },
          { level: 'deep', text: 'Never multitask while eating', insight: 'Undistracted eating improves both digestion and how satisfying the meal feels.' },
          { level: 'deep', text: 'End each meal with one reflection on how it made you feel', insight: 'Reflecting on meals builds the body awareness that guides healthier future choices.' },
        ],
      },
      {
        name: 'Share',
        evidence: '',
        practices: [
          { level: 'gentle', text: 'Share one meal this week with a friend, family member or colleague', insight: 'Shared meals are a cornerstone of the world’s longest-lived communities.' },
          { level: 'gentle', text: 'Exchange one healthy recipe with your Circle', insight: 'Swapping recipes spreads healthy habits through your social network.' },
          { level: 'gentle', text: 'Send a message inviting someone to have coffee or lunch', insight: 'Reaching out strengthens the social bonds that protect long-term health.' },
          { level: 'moderate', text: 'Organise a healthy lunch or dinner with another person once a week', insight: 'Regular shared meals build the routine connection linked to longevity.' },
          { level: 'moderate', text: "Cook a meal inspired by a Circle member's recommendation", insight: 'Trying others’ dishes broadens your diet and deepens community ties.' },
          { level: 'moderate', text: 'Eat one meal this week without anyone using a phone at the table', insight: 'Device-free shared meals improve conversation quality and connection.' },
          { level: 'moderate', text: 'Introduce one meaningful conversation question during a shared meal', insight: 'Meaningful table talk turns eating into a source of belonging, not just fuel.' },
          { level: 'deep', text: 'Host a GoodEat Table with friends or family centred on health and conviviality', insight: 'Hosting around health and conviviality blends two longevity factors: diet and community.' },
          { level: 'deep', text: 'Invite someone who might otherwise eat alone to join you', insight: 'Including others combats loneliness, itself a major risk to health and lifespan.' },
          { level: 'deep', text: 'Share with your Circle one story or lesson from that meal', insight: 'Storytelling around food strengthens the social fabric of your Circle.' },
          { level: 'deep', text: 'Ask everyone at the table: “What is one thing you hope to give more of to others this year?”', insight: 'Conversations about generosity deepen relationships and a sense of purpose.' },
        ],
      },
      {
        name: 'Celebrate',
        evidence: '',
        practices: [
          { level: 'gentle', text: 'Cook a family recipe with a younger generation', insight: 'Passing recipes across generations preserves identity and strengthens family bonds.' },
          { level: 'moderate', text: 'Share a meaningful food memory with your Circle', insight: 'Recalling meaningful meals deepens connection and a shared sense of belonging.' },
          { level: 'moderate', text: 'Thank the person who prepared your meal', insight: 'Expressing thanks strengthens relationships and lifts wellbeing on both sides.' },
          { level: 'deep', text: 'Invite someone new to your table', insight: 'Widening your table builds the new connections that enrich a long life.' },
        ],
      },
    ],
  },
  {
    id: 'move',
    name: 'GoodMove',
    tagline: 'Movement woven through every day',
    blurb: 'Build steady daily movement, strength, and the joy of moving alongside others.',
    accent: 'oklch(0.62 0.155 76)',
    accent2: 'oklch(0.72 0.175 88)',
    soft: 'oklch(0.955 0.06 92)',
    categories: [
      {
        name: 'Daily practices',
        evidence: 'Steps, strength and cardio each lower mortality risk through different, complementary pathways.',
        practices: [
          { level: 'gentle', text: '7,000 steps a day', insight: 'Around 7,000 steps a day is linked to a sharply lower risk of early death.' },
          { level: 'gentle', text: '5-minute mobility flow every morning', insight: 'A short morning mobility flow improves joint range and reduces stiffness through the day.' },
          { level: 'gentle', text: 'Take the stairs instead of the elevator', insight: 'Stair climbing is a potent micro-workout that improves cardiovascular fitness.' },
          { level: 'gentle', text: 'Stand up every 60 minutes during work', insight: 'Breaking up sitting improves blood sugar and circulation, independent of exercise.' },
          { level: 'moderate', text: '8–10k steps daily', insight: 'Higher daily step counts keep lowering mortality risk up to around 10,000.' },
          { level: 'moderate', text: '2 strength sessions per week', insight: 'Two weekly strength sessions preserve muscle and bone and lower all-cause mortality.' },
          { level: 'moderate', text: '1 cardio session of 30–45 minutes per week', insight: 'Regular cardio strengthens the heart and raises the VO₂ max tied to longevity.' },
          { level: 'moderate', text: '10 minutes of mobility or stretching, 4x a week', insight: 'Frequent mobility work maintains flexibility and reduces injury risk as you age.' },
          { level: 'deep', text: '10k+ steps daily', insight: 'Higher activity volumes add further gains in fitness, mood and metabolic health.' },
          { level: 'deep', text: '3 strength sessions per week', insight: 'Three sessions accelerate strength and muscle gains for power and independence with age.' },
          { level: 'deep', text: '1 VO₂ max session per week', insight: 'VO₂ max is one of the strongest single predictors of long-term survival.' },
          { level: 'deep', text: 'Daily mobility, 15 minutes', insight: 'Daily mobility builds lasting flexibility and resilient, well-moving joints.' },
        ],
      },
      {
        name: 'Social & stretch practices',
        evidence: '',
        practices: [
          { level: 'gentle', text: '20-minute walk with a friend or colleague', insight: 'Walking with others combines movement with the social connection that supports health.' },
          { level: 'gentle', text: 'Walk-and-talk call instead of a seated call', insight: 'Turning calls into walks adds easy activity and breaks up prolonged sitting.' },
          { level: 'moderate', text: 'One Circle walking challenge', insight: 'Shared goals boost motivation and make activity far more likely to stick.' },
          { level: 'moderate', text: 'One partner workout during the month', insight: 'Exercising with a partner improves consistency and accountability.' },
          { level: 'deep', text: 'Complete one physical challenge: a 10km hike, swim, dance event, or cycling challenge', insight: 'Training toward a challenge builds fitness and a rewarding sense of achievement.' },
          { level: 'deep', text: 'Lead one movement session for your Circle (even 10 minutes on Zoom)', insight: 'Leading others reinforces your own habit and strengthens your Circle’s bonds.' },
        ],
      },
    ],
  },
  {
    id: 'mind',
    name: 'GoodMind',
    tagline: 'Attention, calm, and connection',
    blurb: 'Train a steadier mind through breath, reflection, and honest connection with others.',
    accent: '#AECE36',
    accent2: 'oklch(0.82 0.17 122)',
    soft: 'oklch(0.95 0.08 120)',
    light: true,
    categories: [
      {
        name: 'Daily practices',
        evidence: 'Brief, regular practices in attention and reflection compound into measurable reductions in stress and anxiety.',
        practices: [
          { level: 'gentle', text: '2 minutes of conscious breathing daily', insight: 'Even brief daily breathing practice lowers stress reactivity and calms the nervous system.' },
          { level: 'gentle', text: 'No phone for the first 15 minutes after waking', insight: 'A phone-free start protects your attention and sets a calmer tone for the day.' },
          { level: 'gentle', text: 'Write 3 gratitude lines before sleep', insight: 'Regular gratitude practice is reliably linked to higher wellbeing and lower stress.' },
          { level: 'gentle', text: '5 minutes of quiet reflection', insight: 'Short daily stillness builds the attention control that buffers against stress.' },
          { level: 'moderate', text: '10-minute meditation, 4x a week', insight: 'Regular meditation measurably reduces anxiety and improves emotional regulation.' },
          { level: 'moderate', text: 'Daily emotional check-in (“What am I feeling?”)', insight: 'Naming feelings (“affect labelling”) reduces their intensity and improves self-regulation.' },
          { level: 'moderate', text: '1 hour of distraction-free deep work a day', insight: 'Protected, distraction-free focus strengthens attention and a sense of accomplishment.' },
          { level: 'moderate', text: 'One screen-light evening per week', insight: 'Periodic breaks from screens reduce overstimulation and improve mood and sleep.' },
          { level: 'moderate', text: 'Leave your phone at home when going to sports or a restaurant', insight: 'Time away from your phone deepens presence and the quality of real-world connection.' },
          { level: 'deep', text: '15–20 minute meditation daily', insight: 'Longer daily practice produces larger, lasting gains in attention and calm.' },
          { level: 'deep', text: 'Daily journaling', insight: 'Expressive writing reduces rumination and improves both mood and stress resilience.' },
          { level: 'deep', text: 'One half-day digital detox per week', insight: 'Regular digital breaks reset attention and ease the low mood linked to heavy use.' },
          { level: 'deep', text: 'Practice cognitive reframing under stress', insight: 'Reframing stressful thoughts is a core CBT skill shown to lower anxiety.' },
        ],
      },
      {
        name: 'Social & stretch practices',
        evidence: '',
        practices: [
          { level: 'gentle', text: 'Send one thoughtful message a week to someone you appreciate', insight: 'Small acts of reaching out strengthen relationships and lift both people’s mood.' },
          { level: 'gentle', text: 'Have one meaningful conversation during the month', insight: 'Deeper conversations, more than small talk, are associated with greater happiness.' },
          { level: 'moderate', text: 'One Circle vulnerability check-in weekly: “What drained you? What nourished you?”', insight: 'Honest sharing builds the trust and belonging that protect mental health.' },
          { level: 'moderate', text: 'Share one personal reflection in the WhatsApp group', insight: 'Expressing vulnerability deepens connection and reduces feelings of isolation.' },
          { level: 'deep', text: 'Offer one act of service during the month: mentor, help, listen, or volunteer', insight: 'Helping others reliably boosts the helper’s own wellbeing and sense of purpose.' },
          { level: 'deep', text: 'Host a deep conversation with another participant: “What changed you? What do you fear? Who are you becoming?”', insight: 'Meaningful dialogue fosters the close relationships central to a long, good life.' },
        ],
      },
    ],
  },
];

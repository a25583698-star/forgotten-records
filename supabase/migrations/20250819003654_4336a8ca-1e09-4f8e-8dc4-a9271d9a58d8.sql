-- Add more horrific patient records inspired by horror movies
INSERT INTO patients (id, name, record) VALUES
(4, 'Sarah Connor', 'Patient exhibits severe paranoia regarding mechanical entities. Claims to have witnessed apocalyptic events. Diagnosed with temporal displacement syndrome. Treatment: High-dose sedatives. Status: ESCAPED - LOCATION UNKNOWN'),
(5, 'Jack Torrance', 'Writer admitted for severe psychological breakdown. Exhibits violent tendencies and claims to hear voices from hotel spirits. Last entry: Found in room 237 speaking to empty chairs. CAUTION: EXTREMELY DANGEROUS'),
(6, 'Regan MacNeil', '12-year-old patient showing signs of dissociative identity disorder. Strange physical manifestations noted. Temperature fluctuations in room. Multiple priests requested. Case transferred to special containment.'),
(7, 'Annie Wilkes', 'Former nurse with obsessive compulsive tendencies. Extreme attachment to fictional characters. History of violence against authors. SECURITY LEVEL: MAXIMUM'),
(8, 'Norman Bates', 'Split personality disorder. Patient believes his deceased mother still gives him instructions. Taxidermy obsession noted. Room searches reveal disturbing collections.'),
(9, 'Hannibal Lecter', 'Brilliant psychiatrist turned patient. Diagnosed with antisocial personality disorder and cannibalistic tendencies. NEVER TO BE LEFT ALONE WITH STAFF'),
(10, 'Carrie White', 'Teenage patient with history of severe abuse. Exhibits unexplained phenomena during emotional episodes. Multiple staff injuries reported. Telekinetic abilities suspected.'),
(11, 'Damien Thorn', 'Child patient with disturbing behavioral patterns. Animals die in his presence. Staff report feeling overwhelming dread. Multiple nannies have resigned or disappeared.'),
(12, 'Patrick Bateman', 'Wealthy businessman with severe narcissistic personality disorder. Obsessed with appearance and status. Detailed violent fantasies documented. High-functioning psychopath.'),
(13, 'Jason Voorhees', 'Mute patient with severe disfigurement. History of drowning trauma. Exhibits superhuman strength. Multiple escape attempts. Current location: UNKNOWN'),
(14, 'Michael Myers', 'Catatonic since age 6 after family incident. Shows no emotion or response to stimuli. Staff report feeling watched. Recent activity suggests emerging awareness.'),
(15, 'Freddy Krueger', 'Burn victim with severe psychological trauma. Claims to enter others dreams. Multiple patients report shared nightmares. Sleep monitoring required.'),
(20, 'Dr. Henry Jekyll', 'Physician conducting illegal experiments on himself. Personality drastically changes between day and night shifts. Chemical dependency noted. TERMINATED FROM STAFF'),
(25, 'Rosemary Woodhouse', 'Postpartum psychosis with paranoid delusions about cult activity. Claims baby was taken for ritual purposes. Refuses all medication. Constant screaming at night.'),
(30, 'Laurie Strode', 'Trauma survivor with severe PTSD. Extreme paranoia and weapons hoarding. Claims to be stalked by unknown entity. Multiple security breaches in room.'),
(35, 'Sidney Prescott', 'Multiple trauma survivor. Trust issues with all staff members. Exhibits hypervigilance. Phone calls trigger violent episodes. Identity protection protocols in effect.'),
(40, 'Chris Washington', 'Young man claiming medical conspiracy involving hypnosis and surgical procedures. Refuses all treatment. Exhibits signs of memory manipulation. Investigation pending.'),
(45, 'Erin', 'Found wandering in woods with no memory of past 72 hours. Speaks of underground facilities and human experimentation. Scars consistent with surgical procedures.'),
(50, 'Ellen Ripley', 'Space program veteran with severe PTSD. Claims of alien encounters. Exhibits extreme paranoia about contamination. Refuses medical examinations.'),
(55, 'Danny Torrance', 'Child with psychic abilities. Sees deceased patients in hallways. Draws disturbing images of future events. Special monitoring required.'),
(60, 'Thomasin', 'Religious trauma survivor found in wilderness. Speaks of supernatural encounters and family disappearances. Exhibits knowledge of occult practices.');

-- Update existing records to be more horrific
UPDATE patients SET record = 'CLASSIFICATION: SEVERE PSYCHOTIC BREAK

ADMISSION DATE: October 13th, 1978
CHIEF COMPLAINT: Patient found wandering cemetery grounds, covered in soil and speaking to empty graves

MENTAL STATUS: Catatonic episodes alternating with violent outbursts. Claims the dead whisper instructions. Multiple staff injuries during feeding attempts.

TREATMENT NOTES: 
- Day 3: Patient carved symbols into cell wall using fingernails
- Day 7: Found speaking fluent Latin despite no prior knowledge
- Day 12: Temperature in room dropped 20 degrees during session
- Day 18: INCIDENT REPORT FILED - Attending physician found unconscious

CURRENT STATUS: MAXIMUM SECURITY CONTAINMENT
PROGNOSIS: DETERIORATING
RECOMMENDATIONS: Consider experimental procedures

⚠️ WARNING: DO NOT ENTER ROOM ALONE ⚠️' WHERE id = 1;

UPDATE patients SET record = 'CLASSIFICATION: HOMICIDAL IDEATION WITH SUPERNATURAL MANIFESTATIONS

PERSONAL HISTORY: Former elementary school teacher until "the incident"
ADMISSION: Brought in restraints after neighborhood disappearances

BEHAVIORAL OBSERVATIONS:
- Speaks to empty corners of room
- Draws maps of underground tunnel systems
- Refuses to eat, claims "they" poison the food  
- Night staff report hearing children singing in her room

DOCUMENTED INCIDENTS:
- Week 1: All clocks in wing stopped at 3:33 AM
- Week 2: Security cameras show patient in two locations simultaneously  
- Week 3: Blood found on walls despite patient being restrained
- Week 4: Three staff members report identical nightmares

MEDICATION: All psychotropics ineffective
STATUS: ISOLATION PROTOCOL ALPHA-7
NOTES: Family members refuse all contact

🩸 DANGER LEVEL: EXTREME 🩸' WHERE id = 2;

UPDATE patients SET record = 'CLASSIFICATION: DISSOCIATIVE IDENTITY DISORDER / POSSESSION SYNDROME

BACKGROUND: Seminary student before psychological break
SYMPTOMS: Multiple personalities, some claiming to be centuries old

PERSONALITY DOCUMENTATION:
1. "Michael" - Timid, speaks only in whispers  
2. "The Cardinal" - Aggressive, speaks medieval Latin
3. "Legion" - Claims to be multiple entities
4. Unknown Entity - Speaks in reverse, predicts deaths

PHYSICAL MANIFESTATIONS:
- Body temperature fluctuates between 95°F and 108°F
- Stigmata appears during episodes
- Levitation witnessed by multiple staff
- Languages unknown to patient spoken fluently

EXORCISM ATTEMPTS: 3 (ALL FAILED)
PRIESTS ASSIGNED: 7 (4 HOSPITALIZED, 2 TRANSFERRED, 1 MISSING)

⛪ SPIRITUAL INTERVENTION ONGOING ⛪
🔥 HOLY WATER SUPPLY: UNLIMITED 🔥' WHERE id = 3;
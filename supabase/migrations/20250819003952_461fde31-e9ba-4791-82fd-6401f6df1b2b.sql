-- Add more horrific patient records inspired by horror movies (fixed syntax)
INSERT INTO patients (id, name, record) VALUES
(7, 'Jack Torrance', 'CLASSIFICATION: VIOLENT PSYCHOTIC BREAK

PERSONAL HISTORY: Author, family man until isolation incident at Overlook Hotel
ADMISSION: Brought in restraints after attacking family with axe

BEHAVIORAL OBSERVATIONS:
- Constant typing on non-existent typewriter
- Speaks to empty ballroom, claims to attend 1920s parties
- Carved "All work and no play makes Jack a dull boy" into cell walls
- Night terrors involving hedge animals coming alive

MEDICAL NOTES:
- Severe frostbite on extremities despite indoor environment
- Claims maze patterns appear in peripheral vision
- Responds to name "Lloyd" when heavily sedated
- Room 237 triggers violent episodes

STATUS: MAXIMUM SECURITY - ISOLATION WARD
WARNING: HISTORY OF FAMILIAL VIOLENCE'),

(8, 'Annie Wilkes', 'CLASSIFICATION: OBSESSIVE COMPULSIVE PERSONALITY DISORDER

BACKGROUND: Former head nurse, Angel of Mercy killer
ADMISSION: Captured after author imprisonment incident

PSYCHOLOGICAL PROFILE:
- Extreme attachment to fictional characters
- Bipolar episodes triggered by plot inconsistencies  
- History of mercy killings of patients
- Pharmaceutical knowledge used for torture

DOCUMENTED INCIDENTS:
- Collected pain medication to help other patients
- Found hoarding medical instruments in mattress
- Attacked orderly for poor penmanship in charts
- Claims God speaks through romance novels

SECURITY MEASURES: No access to medical supplies
PROGNOSIS: Untreatable psychopathy
DANGER: FORMER STAFF MEMBER - NEVER ALONE'),

(9, 'Regan MacNeil', 'CLASSIFICATION: DISSOCIATIVE IDENTITY DISORDER / UNKNOWN SYNDROME

AGE: 12 years old at admission
PRESENTING SYMPTOMS: Multiple personality manifestation with violent tendencies

PERSONALITY DOCUMENTATION:
- Primary: Regan (withdrawn, speaks rarely)
- Secondary: Captain Howdy (aggressive, profane, supernatural knowledge)
- Tertiary: Unknown entity speaking ancient Aramaic

PHYSICAL MANIFESTATIONS:
- Head rotation beyond normal human range
- Levitation episodes (documented on security footage)
- Body temperature fluctuations: 95°F to 110°F
- Projectile vomiting of unknown green substance

RELIGIOUS INTERVENTION: Multiple exorcism attempts
CURRENT STATUS: SPECIAL CONTAINMENT UNIT
BLESSED WATER REQUIRED FOR ALL INTERACTIONS'),

(10, 'Norman Bates', 'CLASSIFICATION: DISSOCIATIVE IDENTITY DISORDER

BACKGROUND: Motel proprietor, taxidermist
FAMILY HISTORY: Complicated relationship with deceased mother

PERSONALITY SPLITS:
1. Norman - Meek, polite, bird enthusiast
2. Mother - Controlling, violent, jealous of women
3. Integration attempts unsuccessful

BEHAVIORAL PATTERNS:
- Speaks to empty chair, responds as Mother
- Obsessive bird watching and preservation
- Extreme reaction to female staff members
- Found dressed in womens clothing during episodes

TREATMENT HISTORY: 15 years institutionalized
ROOM MODIFICATIONS: All mirrors removed
VISITORS: None permitted per Mother instructions
BIRD TAXIDERMY PRIVILEGES REVOKED');

-- Update Patient #66 record to be more mysterious and remove hints
UPDATE patients SET 
name = 'Subject X',
record = 'CLASSIFICATION: [REDACTED]

AUTHORIZATION LEVEL: OMEGA CLEARANCE REQUIRED
FACILITY: SUBLEVEL 7 - MAXIMUM CONTAINMENT

INCIDENT DATE: [REDACTED]
DISCOVERY LOCATION: [REDACTED]
ANOMALOUS PROPERTIES: [REDACTED]

PROJECT DESIGNATION: NIGHTFALL
RESEARCH TEAM: DR. [REDACTED], DR. [REDACTED]
STATUS: ACTIVE CONTAINMENT

WARNING: UNAUTHORIZED ACCESS WILL RESULT IN [REDACTED]

THIS DOCUMENT REQUIRES ADMINISTRATOR PRIVILEGES'
WHERE id = 66;
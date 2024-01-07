---
layout: post
title: gender in data models
category: reference
image: 
    name: peony.jpg
    alt: "Image unrelated to post. A light pink peony in full bloom, close up."
---

<!-- TOC -->

- [Context and problem](#context-and-problem)
- [Known limitations](#known-limitations)
- [Where do we need help?](#where-do-we-need-help)
- [Scope](#scope)
    - [Out of scope](#out-of-scope)
- [Core definitions](#core-definitions)
- [Data on the transgender community](#data-on-the-transgender-community)
- [Issues and considerations](#issues-and-considerations)
    - [Do you need gender data?](#do-you-need-gender-data)
    - [Safety and prevention of abuse](#safety-and-prevention-of-abuse)
- [Anti-patterns](#anti-patterns)
    - [Legal gender markers](#legal-gender-markers)
    - [Biological sex](#biological-sex)
    - ["Other" or similarly named categories](#other-or-similarly-named-categories)
    - [Expansive lists](#expansive-lists)
    - [Free text entry](#free-text-entry)
    - [Assumptions that a single term will fully encompass gender, especially in a more exhaustive list of options](#assumptions-that-a-single-term-will-fully-encompass-gender-especially-in-a-more-exhaustive-list-of-options)
    - [Automatic detection of gender](#automatic-detection-of-gender)
    - [Using gender as a proxy for pronouns](#using-gender-as-a-proxy-for-pronouns)
- [Patterns and solutions](#patterns-and-solutions)
    - [Decline to specify](#decline-to-specify)
    - [Not listed here](#not-listed-here)
    - [Allow for changes](#allow-for-changes)
    - [Two- or multi- step approach](#two--or-multi--step-approach)
    - [Organ inventory](#organ-inventory)
    - [Differentiate with ‘cis’ and ‘trans’](#differentiate-with-cis-and-trans)
- [Healthcare or legal systems](#healthcare-or-legal-systems)
- [Examples in existing systems](#examples-in-existing-systems)
    - [WPATH guidelines on EMR](#wpath-guidelines-on-emr)
    - [Facebook](#facebook)
    - [Drupal](#drupal)
    - [Salesforce Health Cloud](#salesforce-health-cloud)
    - [Adobe XDM](#adobe-xdm)
    - [Epic Healthcare EMR](#epic-healthcare-emr)

<!-- /TOC -->


## Context and problem

As transgender and nonbinary people gain visibility and legal identification expands gender fields to include nonbinary genders and/or "X" markers, data models that only support "male" and "female" (or "M"/"F") are no longer sufficient to align with individuals' legal records or personal identity. However, with the large range of terminology used by transgender and nonbinary people, tackling this problem can seem challenging and brings the potential to further harm or exclude already marginalized individuals.

## Known limitations

- This is a work in progress
- While I have relied on many articles and talks in collating this resource, as well as on my own experiences as a nonbinary trans person enmeshed in nonbinary and trans communities, it is still largely the work of one person at present and will not represent the views of all trans, nonbinary, or gender-expansive people

## Where do we need help?

Proofreading and commentary from all readers!

If you're knowledgeable on this topic, additional information and viewpoints are tremendously useful.

If you're new, where do you have questions? What hasn't been explained enough? What do you leave this document still wondering about?

## Scope

This document will look at existing and potential solutions to modeling gender in data for use by software systems, primarily via presenting and analyzing patterns and anti-patterns.

### Out of scope

- The business case for building data models and software that is inclusive of all.
- The validity of trans identities, or of any specific term or set of terms used by individuals in reference to their gender.
- A detailed overview of trans people's experiences or understandings; a "Gender 101" or "Trans 101" document; a complete dictionary of terminology relating to the trans or gender diverse community.

## Core definitions

In order to more easily discuss these topics, I will note here my working definitions for some terms below. 

> A note on language… Please do not assume that these definitions are fixed or can be broadly applied across cultures and countries. The language around gender has continued to change as the trans community is more able to connect, have in depth conversations, and define for ourselves how we use language. On an individual, person-to-person level, it's always preferable to mirror the language people use for themselves rather than prescriptively apply terms.

- **Transgender** (abbreviated trans; also trans\*): anyone whose gender does not align with their sex assigned at birth. This is both an umbrella term and an individual identity. Used here, it is inclusive of but not limited to (and these identities may overlap): transgender women, transgender men, nonbinary people - including genderqueer, agender, or genderfluid people as well as many other labels - and anyone who is otherwise not *cisgender*.
- **Cisgender** (abbreviated cis): anyone whose gender matches their sex assigned at birth.
  > Language note: trans and cis are derived from Latin, meaning "on the other side of" and "on this side of" respectively.
- **Binary/Nonbinary**: these terms are in reference to the idea of gender as a binary consisting only of man/male and woman/female, which is neither accurate nor effective in describing human experience.
- **Nonbinary** (also non-binary; abbreviated NBi, NBy, NB [recommended to avoid as it can cause language collisions around NB used to mean non-Black], enby [informal]): an umbrella term or individual identity for anyone whose gender does not wholly and solely align with one binary gender.

## Data on the transgender community

There's a dearth of data on trans individuals. That said, we do have some relevant sources that have given us broad insight into trans communities.

- [U.S. Transgender Survey](https://www.ustranssurvey.org/reports), the largest survey ever devoted to the lives and experiences of transgender people, with 27,715 respondents across the United States.
- [Gender Census](https://www.gendercensus.com/), an annual survey that collects information about the language used by people whose genders are not adequately described, expressed or encompassed by the restrictive gender binary.

Both of these sources use ‘nonbinary’ as their usual spelling; I am mirroring that here.

## Issues and considerations

### Do you need gender data?

It's always worthwhile to stop and look at how relevant or necessary gender information is to your goals.

> "'I would argue that you almost never have to ask for gender,' Stevens said.
>
> "If you’re collecting gender identity data to personalize user-facing copy, try asking for preferred pronouns  instead. If you’re asking because you want to make in-app content recommendations, try asking about the user’s content preferences. If you’re asking to generate a user avatar, let the user generate their own. Gender identity is a poor proxy variable — stick to asking for the information you actually want.

[(Hunter, 2020)](https://builtin.com/software-engineering-perspectives/trans-inclusivity-tips-developers)

Drupal's gender field includes the following guidance in its description:

> 1.	Do you need to address a person with pronouns? Genders do not necessarily map easily onto the pronouns a person uses. If you need to associate pronouns with a person, ask for those pronouns directly.
> 2.	Do you need to address a person with a title or prefix (such as Mr./Ms./Mx.)? Genders also do not necessarily correspond to a person's preferred title, and moreover would leave out honorifics related to profession, such as Dr., Rev., or Capt. If you need to associate titles with a person, ask for those titles directly.
> 3.	Do you need to collect gender information for demographic data reasons? If you do, make sure you are able to accurately record a person's gender, rather than forcing them into choosing from limited options. If you need to use the data for recording trends, writing reports, or segmentation for advertising or other reasons, consider post-processing the data to group related genders depending on your specific use-case.
> 4.	Do you need to know a person's health needs, clothing preferences or bathroom use? If you are organizing an event, for instance, you might want to know what sort of facilities to provide or what sorts of t-shirts to order. Genders, however, do not necessarily correspond to specific body types, body functions, health requirements (such as menstrual supplies) or reflect what types of facilities a person would feel safest using in a public environment. If you are collecting gender data for this purpose, ask the more precise questions specifically.
> 5.	Do you want to publicly display a person's gender on a profile? This is often a choice made by social media and dating/relationship sites. If you do this, consider making the field optional altogether. If you are providing user avatars, remember that human bodies come in all sorts, and allow individuals to choose an avatar separately from collecting this data.
> 6.	Do you need to know assigned gender for legal, medical or regulatory reasons? Current gender does not necessarily correspond to assigned sex at birth or legal gender marker, so be sure you are clear in what you are requesting of a person. It's particularly critical to be transparent about your privacy policy and the how this data will be used.

[(McCabe and Beach, 2019)](https://www.drupal.org/project/gender)

### Safety and prevention of abuse

> ....if this information is displayed publicly there is potential for abuse by people who like to make discriminatory jokes about gender identity, and any such system would need to put steps in place to prevent such abuse.
>
> ...
>
> Instead of putting the burden on a user to fully understand the risks of sharing their highly personal information, let’s put the burden on ourselves to treat that information right. If we have no strong reason to collect it, or can’t guarantee its safety, we shouldn’t collect it.

[(Spicknall, 2019)](https://medium.com/@SorenSpicknall/protecting-queer-communities-through-data-4707ae0cb562)

If you do collect gender data, inform the user what it is used for and who it will be shared with.

## Anti-patterns

### Legal gender markers

The availability of nonbinary gender options in legal systems varies by location. The ability to change one's gender marker (from one binary category to another or from binary to nonbinary) varies even more widely, with requirements ranging from simple voluntary declaration, to verification by medical professional(s) of varying treatments which vary in how accessible they are and whether they are actually desired by individuals for whom this is relevant, to only changing in response to proven "error," etc.

[(Transgender Law Center, 2017)](http://transgenderlawcenter.org/wp-content/uploads/2016/12/Birth-Cert-overview-state-by-state.pdf) [(Movement Advancement Project)](https://www.lgbtmap.org/equality-maps/identity_document_laws) [(Knight and Ghosal, 2016)](https://www.hrw.org/world-report/2016/country-chapters/africa-americas-asia-europe/central-asia-middle-east/north-0)

If you are not specifically trying to refer to an individual’s legal identification, don’t tie gender to it.

### Biological sex

This is variously defined to refer to sex assigned at birth, legal gender/sex markers, or current physical sex based on any number of characteristics, which may include

- chromosomes
- gonads
- genitalia
- primary sex hormones
- secondary sex characteristics

and more. This identifier may or may not be treated as binary and may or may not take into account an individual's medical history.

[(Montañez, 2017)](https://blogs.scientificamerican.com/sa-visual/visualizing-sex-as-a-spectrum/)

Outside of healthcare, this is largely unnecessary. For healthcare, see [Two- or multi- step approach](#two--or-multi--step-approach) and [Organ inventory](#organ-inventory).

### "Other" or similarly named categories

As a way to accurately represent gender diverse people, "other" is, quite literally, othering. "Prefer not to say" or similar wording can be an excellent option, but not if it is the only option outside the traditional gender binary that is available to users - in that case, it becomes no longer a preference but a requirement not to say.

> "Researchers have also developed methods to respond to challenges involved in data collection about sexual and gender identities which are culturally specific and unique. For example, in 2011, the government of Nepal attempted the world’s first census in which respondents had the option of choosing 'Male,' 'Female,' or 'Third Gender.' The effort was not successful for a number of reasons, among which was that large proportions of the gender minority population did not identify with the term 'third gender.' Subsequent research determined that the use of culturally specific terms such as 'Methi' and 'Kothi' would have increased the effectiveness of the census effort."

[(Park, 2016)](https://williamsinstitute.law.ucla.edu/publications/data-collection-sogi/)

### Expansive lists

While these can be appealing for the choice they afford users, they come with notable use and implementation considerations.

- **Timeliness.** This area of language moves quickly and terms are coming into and out of use fast. Larger sets of options require more work to stay up to date and include recent terminology, as well as prompting more questions about which terms, if any, are no longer used to the point they should be removed.
- **Localization.** Hyper-specific terms are easy targets for localization issues, and a more detailed list requires more in-depth research to localize.
- **User overwhelm.** A list with a large set of options, particularly if it's many unfamiliar words, may confuse users.
- **Exclusive choice.** Mentioned briefly above, the more options a list of gender terms offers, the more likely two or more terms are to overlap. Unless offering a "check all that apply" system, this makes accurate choice more difficult for the user rather than easier.

### Free text entry

This approach provides much of the benefits of an expansive list, and removes the drawbacks discussed above. However, it comes at the cost of making data storage and analysis more expensive, challenging, and time-consuming. It may additionally still contribute to user confusion for anyone who is uncertain where or how the information will be used or whether there are expected responses.

For smaller projects, this is still an option however. Or you can offer this to a small subset of users who find that the available options don't fit - see [Not listed here](#not-listed-here).

### Assumptions that a single term will fully encompass gender, especially in a more exhaustive list of options

Especially when providing expansive lists or allowing write in fields, ensure that terms that are not mutually exclusive must be chosen as though they are. This is the reasoning behind guidance for a two-step approach, described in more detail in [Two- or multi- step approach](#two--or-multi--step-approach), which "measures assigned sex at birth and self-reported gender identity at the time of the survey" [(Park, 2016)](https://williamsinstitute.law.ucla.edu/publications/data-collection-sogi/)

> "...some terms aren’t mutually exclusive, and framing them as such is offensive, Mons said: 'For example, if we list Man, Woman, Non-Binary, Trans Man and Trans Woman, **does that separation imply that someone who is trans and identifies as a man is not a man?**'"

[(Gossett, 2020)](https://builtin.com/data-science/dscout-gender-identity-data-practice) emphasis mine

### Automatic detection of gender

In addition to reinforcing binarism, this approaches tends to reinforce sexism as well, and can further reinforce other prejudices as they intersect with gender.

> "Moreover, these works tend to codify (literally, to write into code) essentialist, stereotypical characterizations of male and female communication patterns and present them as universal, context-free, scientific truths."

[(kanarinka, 2016)](https://civic.mit.edu/index.html%3Fp=1165.html)

For transgender individuals, automatic categorization as a gender they are not is often a frequent and painful occurrence. We should take care not to introduce unnecessary causes of harm into our systems, especially when they are less accurate and helpful than user self-identification.

### Using gender as a proxy for pronouns

Gender isn’t one-to-one with pronouns (or terms of address). If you want to know how to refer to someone, ask pronouns separately.

## Patterns and solutions

### Decline to specify

Including "decline to specify" or a similar opt-out response is always a positive addition unless the information is actually necessary. However, as mentioned above, don't use this as a replacement for the inclusion of terms that actually match the identity of the individual. Opting out should be a choice, not forced due to lack of other options.

### Not listed here

Including "gender not listed here" or a similar response provides an out for anyone who does not feel represented by the available options. You could follow this up with a free text entry field.

### Allow for changes

Avoid treating gender as an immutable category - make sure users have the ability to edit it.

### Two- or multi- step approach

As mentioned briefly above, a two-step approach separates gender and assigned sex at birth, allowing healthcare systems additional information about the patient. See [WPATH guidelines on EMR](#wpath-guidelines-on-emr) and associated reference for more details.
This may also be expanded to a multi-step approach, with questions covering some/all of

- Gender
- Sex assigned at birth
- Legal gender/sex designation
- Transgender status
  - This may additionally benefit from self-identification as "gender diverse, gender non-conforming, gender variant, or gender expansive" [(Stevens)](https://nikkistevens.com/open-demographics/questions/gender.html) either in the same question or as an additional question
- Intersex status

…but only if the data is necessary.

### Organ inventory

> Provide a means to maintain an inventory of a patient's medical transition history and current anatomy. An anatomical inventory would allow providers to record into the chart (and/or update as needed) the organs each individual patient has at any given point in time; this inventory would then drive any individualized auto-population of history and physical exam templates. This inventory should be uncoupled from the patient's recorded gender identity, assigned sex, or preferred pronouns.
>
> ...
>
> These procedures, however, also should also be un-coupled from any gender-coded template so that an individual coded as male who has had a hysterectomy, for example, could have that history documented. In addition, sex-specific organ procedures and diagnoses relating to these organs should be un-coupled, so that (as an example) a prostatic ultrasound may be ordered on a patient registered as female, or a cervical pap smear ordered on a patient registered as male. Such practices would allow enhanced decision support for transgender-specific care, such as medication interactions, organ- and sex-specific preventive health alerts, or accommodations for sex-specific laboratory normal value ranges.

[(Deutsch, et. al, 2013)](https://www.healthit.gov/isa/sites/isa/files/2017-11/JAMIA%20-%20Transgender%20Health%20and%20EMRs.pdf)

Refer to the reference linked above for detailed examples of organ or surgical history inventories.

### Differentiate with ‘cis’ and ‘trans’

Avoid questions that contrast ‘male’ and ‘trans male’ or any parallel set of terms. Either contrast ‘cis male’ and ‘trans male,' or allow respondents to choose multiple responses.

## Healthcare or legal systems

These systems add additional requirements and restrictions. In cases like these, it may be helpful to have an additional field for **legal gender/sex designation** (usually set to F, M, or X) in order to allow for alignment with existing documentation without preventing self-identification on the part of the individual.

Healthcare systems in particular may benefit from [Organ inventory](#organ-inventory) and [Two- or multi- step approach](#two--or-multi--step-approach).

## Examples in existing systems

### WPATH guidelines on EMR

- WPATH: World Professional Association for Transgender Health [(WPATH, 2023)](https://wpath.org/about/mission-and-vision)
- EMR: Electronic Medical Records

> Preferred name, gender identity, and pronoun preference, as identified by patients, should be included as demographic variables (such as with ethnicity). These would be captured in readily amendable, optional fields that are separate from the patient’s state-listed name and sex or gender designation, which may continue to be used for billing purposes in circumstances when the patient has not yet obtained legal change of name and/or sex or gender designation. Note that some patients may identify as ‘genderqueer’ and prefer the use of neither pronoun. While lists of current common gender identities, sex options, and pronoun options are provided [in original document, see source], ideally field parameters would be easily amended to reflect changing paradigms and social trends within transgender communities.

[(Deutsch, et. al, 2013)](https://www.healthit.gov/isa/sites/isa/files/2017-11/JAMIA%20-%20Transgender%20Health%20and%20EMRs.pdf)

### Facebook

> "In 2014, Facebook expanded their gender options from 2 to 58 for English speakers in the US and UK. The gender options they added were created in consultation with the LGBTQIA community and range from 'gender non-conforming' to 'two-spirit' to 'trans female'. The corporation later added the ability to identify as more than one gender and to input a custom gender. ... While these changes may appear to be progressive, Facebook’s databases still resolve custom and non-binary genders to Male and Female on the backend based on the binary gender that users select at sign-up where the custom option is not available. Here is how the Facebook Marketing API views gender: 1 = Male, 2 = Female. So while a user and her friends may see her presented as the gender she elects, she is a 1 = Male or 2 = Female to any advertisers looking to purchase her attention."

[(kanarinka, 2016)](https://civic.mit.edu/index.html%3Fp=1165.html)

### Drupal

Uses a list of genders developed by the Open Demographics project. [(McCabe and Beach, 2019)](https://www.drupal.org/project/gender) [(Stevens)](https://nikkistevens.com/open-demographics/questions/gender.html)

### Salesforce Health Cloud

Includes Male, Female, Other, and Decline to Specify as options for a gender field, and the field can be null. [(Salesforce)](https://developer.salesforce.com/docs/atlas.en-us.health_cloud_object_reference.meta/health_cloud_object_reference/health_contact_custom_fields.htm#!)

### Adobe XDM

Includes Male, Female, Not Specified, and Non-specific. Defaults to not specifed. [(Adobe)](https://experienceleague.adobe.com/docs/experience-platform/xdm/field-groups/profile/demographic-details.html) [(Adobe)](https://github.com/adobe/xdm/blob/master/components/datatypes/person/person.schema.json#L50)

### Epic Healthcare EMR

Uses three different fields: sex assigned at birth, legal sex and gender identity. [(Landman, 2017)](https://www.wired.com/story/the-battle-to-get-gender-identity-into-your-health-records/)


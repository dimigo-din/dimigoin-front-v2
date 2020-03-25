export const Circle = (applicant) => ({
  idx: applicant.idx,
  name: applicant.name,
  description: applicant.description,
  category: applicant.category,
  profileImg:
    applicant.profile_img ||
    import(`../../assets/avatar/${Math.ceil(Math.random() * 5)}.jpg`),
  applyStartDate: applicant.apply_start_date,
  applyEndDate: applicant.apply_end_date,
  chairIdx: applicant.chair_idx,
  chairSerial: applicant.chair_serial,
  chairName: applicant.chair_name,
  status: applicant.status,
});

export const CircleApplicant = (applicant) => ({
  status: applicant.status,
  _id: applicant._id,
  circle: applicant.circle,
  form: applicant.form,
  applier: applicant.applier,
});

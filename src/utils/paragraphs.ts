const paragraphs = [
  "write help person become which system such write person leave fact could most home who world late again mean however without turn mean where state by about there another it she need be work",
  "system through year program give way general work number part take place live point where problem begin feel seem small want show house both between need three state word high look move",
  "time day year people way thing man world life hand part child eye woman place work week case point government company number group problem fact idea water other study question first",
  "think time way people year hand work day man world life part house system point place problem group number case woman child fact idea water other study question first thing right"
];

export const getRandomParagraph = () => {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};
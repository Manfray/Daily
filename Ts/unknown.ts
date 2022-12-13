function getDogName() {
    let x: unknown;
    return x;
   };
   const dogName = getDogName();
   // 直接使用
//    const upName = dogName.toLowerCase(); // Error
   // typeof
   if (typeof dogName === 'string') {
     const upName = dogName.toLowerCase(); // OK
   }
   // 类型断言 
   const upName = (dogName as string).toLowerCase(); // OK
编程5分钟，起名2小时。

场景实战
方法应该具有单一职责特效，通过一个比较好的命名来实现较高的可读性。即实现less is more。那么平时在开发中如何对一些常见的方法来进行命名？
方法命名采用小驼峰的形式，首字小写，往后的每个单词首字母都要大写。和类名不同的是，方法命名一般为动词或动词短语，与参数或参数名共同组成动宾短语，即动词 + 名词。一个好的函数名一般能通过名字直接获知该函数实现什么样的功能。

举几个常见的例子：

例如
1. checkXxx或者validateXx方法，给人的职责便是校验业务，不推荐返回响应对象。
2. find/getXxx返回值为应该为Collection，不推荐是boolean类型。
3. 若方法响应值为boolean类型，方法的前缀推荐为exists/has/is等。
4. find或者exists方法不推荐抛出异常，若未查询到推荐返回null。

## 1.1 方法的单一职责进行命名

下面可以看到一个“名不符实”的危害。

- 函数取名最忌讳的是"名不副实"，举个例子，假如有个Cache类，里面有个函数判断key是否过期：
```java
public boolean isExpired(String key) {
  // 当前时间戳
  long curTimestamp = DateUtils.nowUnixTime();
  // 获取key的存入时间戳
  long storeTimestamp = getStoreTimestamp(key);

  if (curTimestamp - storeTimestamp > MAX_EXPIRE_SECONDS) {
    // 注意这个地方的delete是个隐藏逻辑
    delete(key);
    return true;
  }
  return false;
}
```


上面这个函数从函数字面意思看是判断key是否过期，但是！！它居然在函数里面隐藏了一段特殊逻辑：如果过期则删除掉key。这个就是典型的"名不副实"，这个是最忌讳的，会给后续的开发人员留下"巨坑"。

有两种方式去优化这段代码：

方式一：将隐藏逻辑去掉

```java
public boolean isExpired(String key) {
  // 当前时间戳
  long curTimestamp = DateUtils.nowUnixTime();
  // 获取key的存入时间戳
  long storeTimestamp = getStoreTimestamp(key);

  if (curTimestamp - storeTimestamp > MAX_EXPIRE_SECONDS) {
    return true;
  }
  return false;
}
```


方式二：改变函数名字

```java
public int deleteIfExpired(String key) {
  // 当前时间戳
  long curTimestamp = DateUtils.nowUnixTime();
  // 获取key的存入时间戳
  long storeTimestamp = getStoreTimestamp(key);

  if (curTimestamp - storeTimestamp > MAX_EXPIRE_SECONDS) {
    return delete(key);
  }
  return 0;
}
```

## 1.2 取名面向目的（需求）而非过程

举例说明：

场景：小明可以将一份练习分享给小红，可以多次分享，但非首次分享的场景下直接返回分享成功。

方法命名：

```java
boolean findByUserIdAndSign(String sign, String targetUserId, List results);
```


find方法给人的感觉是查找数据，找到则返回，找不到则返回null，这里返回boolean很不友好。且有些面向过程的感觉，不知道这方法的目的是什么。

```java
 boolean existsByUserIdAndSign(String sign, String targetUserId, List results);
```

exists方法是否存在，返回boolean值合适，但是命名偏面向过程的感觉，不知道这方法的目的是什么。

```java
boolean isShared(String sign, String targetUserId, List results);
```

is：是否存在，shared：是否被分享过。这就能准确的表述出该方法的目的（即产品需求）。但是缺点是：这个方法中有逻辑会填充result列表，但是命名中并未体现出。

```java
//（推荐）4. 
List getResultsIfShared(String sign, String targetUserId);
```

若照片被分享过，那么转化为Results对象输出，这个命名便可以体现出这个方法的目的和实际做的工作。

```java
//（思考）5. 
int addResultsIfShared(String sign, String targetUserId, List results);
```

前提：
[1] List作为入参，通过引用传递来修改内部值，以达到传递最终结果的目的；
[2] 需要boolean值的结果，来告诉main方法，该照片是否被分享过；

若照片被分享过，那么填充Results对象，填充成功返回1，填充失败返回0；

使用pre- prefix前缀，suf- suffix后缀，alo-alone 单独使用

## 2.1 返回真伪值的方法

若方法返回boolean类型，可以推荐使用如下的格式。

| 位置 | 单词 | 意义 | 例子 |
| ---- | ---- | ---- | ---- |
|pre|is|对象是否符合期待的状态 |isValid|
|pre|can|对象能否执行所期待的动作|canRemove|
|pre|should|调用方执行某个命令或方法是好还是不好应不应该，或者说推荐还是不推荐|shouldMigrate|
|pre|has|对象/集合是否持有所期待的数据和属性|hasObservers|
|pre|exists|对象/集合是否存在所期待的数据和属性|existsObservers|
|pre|contains|判断集合是否保存某个元素|containsBeanDefinition|
|pre|needs|调用方是否需要执行某个命令或方法|needsMigrate|

## 2.2 检查的方法

| 位置 | 单词 | 意义 | 例子 |
| ---- | ---- | ---- | ---- |
|pre|ensure|检查是否为期待的状态 不是则抛出异常或返回error|code ensureCapacity|
|pre|validate/check|检查是否为正确的状态 不是则抛出异常或返回error|code validateInputs|

## 2.3 按需求才执行的方法

| 位置 | 单词 | 意义 | 例子 |
| ---- | ---- | ---- | ---- |
|suf|YyyIfXxx|如果发生了Xxx，则执行Yyy||
|suf|IfNeed|需要的时候执行，不需要则什么都不做|drawIfNeed|
|pre|might|同上|mightCreate|
|pre|try|尝试执行 失败时抛出异常 或是返回errorcode|tryCreate|
|suf|OrDefault|尝试执行 失败时返回默认值|getOrDefault|
|suf|OrElse|尝试执行 失败时返回 实际参数中指定的值|getOrElse|
|pre|force|强制尝试执行 error抛出异常或是返回值|forceCreate, forceStop|

## 2.4 与数据相关的方法
| 位置 | 单词 | 意义 | 例子 | 使用程度|
| ---- | ---- | ---- | ---- | --- |
|pre|make|借助多个对象来创建对象|makeAccountWithUserAndDept||
|pre|create/new|新创建|newAccount|高|
|pre|from|从既有的某物新建 或是从其他的数据新建|fromConfig|高|
|pre|to|转换|toString|高|
|pre|transformed|转换|transformedBeanName|高|
|pre|save/store|保存|saveAccount|
|pre|delete/remove|删除|deleteAccount|
|pre|clear/reset|清除或恢复到初始状态|clearAll|
|pre|update|更新|updateAccount|

## 2.5 【重点】查询操作命名
| 位置 | 单词 | 意义 | 例子 | 使用程度|
| ---- | ---- | ---- | ---- | --- |
|pre|get|得到|getAccount|高|
|pre|find/lookup|找到||高|
|pre|resolve|解析得到（偏复杂逻辑）||高|
|pre|compute|计算得到（耗CPU）||高|
|pre|load|本地磁盘读取||高|
|pre|fetch|网络读取||高|
|suf|IfAbsent|存在时缓存读取缓存，否则去“获取”|fetchAccountIfAbsenet|高|
|suf|FromCache|只读取缓存读取||高|

for语法

- getMappingForMethod：在Method中获取Mapping对象；
- getObjectForBeanInstance：在BeanInstance中获取Object对象；

- getCachedObjectForFactoryBean：在FactoryBean中获取CachedObject；

- isBeanEligibleForMetadataCaching：BeanEligible是否在MetadataCaching中；

- getTypeForFactoryBean：在FactoryBean获取Type；

- getLookupPathForRequest：对于Request对象，获取LookupPath属性；


from 语法

- getObjectFromFactoryBean：从给定的FactoryBean获取要公开的对象。
- setContentDispositionFormData：从Data对象来设置ContentDisposition对象。


in语法

- isBeanNameInUse：确定给定的bean名称是否（已在此工厂中）使用，
- isPrototypeCurrentlyInCreation：返回指定的原型bean当前是否正在创建中


with语法

- writeWithMessageConverters：使用MessageConverters进行写操作
- requestedType.isCompatibleWith(producibleType)：【参数作为定语】requestedType是否和producibleType是可共用的。


to语法

- HttpRange.toResourceRegions(httpRanges, resource); 静态方法：HttpRange转化为ResourceRegions对象。
- reorderXmlConvertersToEnd(converters)：将Xml格式转化器重排序放到最后；


within语法

- getPathWithinServletMapping：在ServletMapping内，获取path路径；

个人总结：方法模板

- getXxForYy：对于Yy对象来说，获取Xx对象；
- getXxFromYy：从Yy对象中获取Xx对象，和getXxForYy等效。
- getXxInUse：获取在“使用”中的Xx对象；
- getXxWithinYy：在Yy内获取Xx对象；
- writeWithXx：和（使用）Xx对象来进行write操作；

一个好的思路是：可以写一些英文注释，然后在这些英文注释中提取方法名。
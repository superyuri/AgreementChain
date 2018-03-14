# Basic Sample Business Network
# org.synu.contractnetwork

> This is the "Hello World" of Hyperledger Composer samples, which demonstrates the core functionality of Hyperledger Composer by changing the value of an asset.

This business network defines:

**Participant**
`EndUser`

**Asset**
`Contract` `SealImage` `SignTextImage` `Template`

**Transaction**
`CreateContract` `SignContract` `RevokeContract` `ContractVerify`

**Event**
`SampleEvent`

区块链电子合同

To test this Business Network Definition in the **Test** tab:

测试代码

Create Alice `EndUser` participant:

```
{
  "$class": "org.synu.contractnetwork.participants.EndUser",
  "Id": "Alice@example.org",
  "personInfo": {
    "$class": "org.synu.contractnetwork.participants.Person",
    "title": "Alice Robot",
    "IDCard": "211003199901011234",
    "firstName": "Alice",
    "lastName": "Robot",
    "contactDetails": {
      "$class": "org.synu.contractnetwork.participants.ContactDetails",
      "email": "Alice@example.org",
      "mobilePhone": "15012345678",
      "address": {
        "$class": "org.synu.contractnetwork.participants.Address",
        "city": "Shenyang",
        "country": "China",
        "street": "Shenyang Normal University",
        "postalCode": "110024"
      }
    }
  },
  "userType": "Personal"
}
```

Create Bob `EndUser` participant:

```
{
  "$class": "org.synu.contractnetwork.participants.EndUser",
  "Id": "Bob@example.org",
  "personInfo": {
    "$class": "org.synu.contractnetwork.participants.Person",
    "title": "Bob Robot",
    "IDCard": "311001199501011349",
    "firstName": "Bob",
    "lastName": "Robot",
    "contactDetails": {
      "$class": "org.synu.contractnetwork.participants.ContactDetails",
      "email": "Bob@example.org",
      "mobilePhone": "13512345678",
      "address": {
        "$class": "org.synu.contractnetwork.participants.Address",
        "city": "Shenyang",
        "country": "China",
        "street": "Shenyang Normal University",
        "postalCode": "110024"
      }
    }
  },
  "userType": "Personal"
}
```

Create Charlie `EndUser` participant:

```
{
  "$class": "org.synu.contractnetwork.participants.EndUser",
  "Id": "Charlie@example.org",
  "personInfo": {
    "$class": "org.synu.contractnetwork.participants.Person",
    "title": "Charlie Robot",
    "IDCard": "3110011995010115349",
    "firstName": "Charlie",
    "lastName": "Robot",
    "contactDetails": {
      "$class": "org.synu.contractnetwork.participants.ContactDetails",
      "email": "Charlie@example.org",
      "mobilePhone": "13012345678",
      "address": {
        "$class": "org.synu.contractnetwork.participants.Address",
        "city": "Shenyang",
        "country": "China",
        "street": "Shenyang Normal University",
        "postalCode": "110024"
      }
    }
  },
  "userType": "Personal"
}
```

Create a `SealImage` asset for Alice:

```
{
  "$class": "org.synu.contractnetwork.assets.SealImage",
  "Id": "1",
  "Title": "Alice's Seal",
  "extension": "Jpeg",
  "Content": "",
  "ContentHash": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
  "Enable": true,
  "owner": "resource:org.synu.contractnetwork.participants.EndUser#Alice@example.org"
}
```

Create a `SealImage` asset for Bob:

```
{
  "$class": "org.synu.contractnetwork.assets.SealImage",
  "Id": "2",
  "Title": "Bob's Seal",
  "extension": "Jpeg",
  "Content": "",
  "ContentHash": "481F6CC0511143CCDD7E2D1B1B94FAF0A700A8B49CD13922A70B5AE28ACAA8C5",
  "Enable": true,
  "owner": "resource:org.synu.contractnetwork.participants.EndUser#Bob@example.org"
}
```
Create Name Card Alice and Bob and Charlie

Use Alice Account

Submit 3 `CreateContract` transaction:

1. 演示被撤回的合同
```
{
  "$class": "org.synu.contractnetwork.transactions.CreateContract",
  "Id": "Contract1",
  "menbers": [
    "resource:org.synu.contractnetwork.participants.EndUser#Alice@example.org",
    "resource:org.synu.contractnetwork.participants.EndUser#Bob@example.org"
  ],
  "Title": "借款合同",
  "Extension": "pdf",
  "ContentHash": "C93FDA427F8BCD8B852CB05192974EBDE395226D6BE5D5B31B46FFC1B35A1F9F",
  "SignDeadline": "2018-03-15T12:34:07.270Z"
}
```
2. 演示被拒绝签署的合同

```
{
  "$class": "org.synu.contractnetwork.transactions.CreateContract",
  "Id": "Contract2",
  "menbers": [
    "resource:org.synu.contractnetwork.participants.EndUser#Alice@example.org",
    "resource:org.synu.contractnetwork.participants.EndUser#Bob@example.org"
  ],
  "Title": "转让协议",
  "Extension": "pdf",
  "ContentHash": "7E7BE2D1016085F85C9C383EF4040FC0B2DF93DA506B26DD6AC45886FEE0231E",
  "SignDeadline": "2018-03-15T12:34:07.270Z"
}
```

3. 演示成功的三人签署的合同

```
{
  "$class": "org.synu.contractnetwork.transactions.CreateContract",
  "Id": "Contract3",
  "menbers": [
    "resource:org.synu.contractnetwork.participants.EndUser#Alice@example.org",
    "resource:org.synu.contractnetwork.participants.EndUser#Bob@example.org",
    "resource:org.synu.contractnetwork.participants.EndUser#Charlie@example.org"
  ],
  "Title": "三人合作创业合同",
  "Extension": "pdf",
  "ContentHash": "2764D74AA847F859474D3318F06BF274CDC4737AFFE4D73B477BC8176DB426E1",
  "SignDeadline": "2018-03-15T12:34:07.270Z"
}
```
Alice 在三份合同都签署并盖章了

Alice Submit Contract1-3 `SignContract` transaction:
```
{
  "$class": "org.synu.contractnetwork.transactions.SignContract",
  "contract": "resource:org.synu.contractnetwork.assets.Contract#Contract1",
  "sealImage": "resource:org.synu.contractnetwork.assets.SealImage#1",
  "sealImagePos": {
    "$class": "org.synu.contractnetwork.assets.SignatureImagePos",
    "x": 100,
    "y": 200
  },
  "status": "Signed"
}
```

Alice撤回和第一份合同

Alice Submit a `RevokeContract` transaction:
```
{
  "$class": "org.synu.contractnetwork.transactions.RevokeContract",
  "contract": "resource:org.synu.contractnetwork.assets.Contract#Contract1"
}
```

Bob拒绝签署第二份合同

Bob Submit Contract2 `SignContract` transaction,but params'Reject':
```
{
  "$class": "org.synu.contractnetwork.transactions.SignContract",
  "contract": "resource:org.synu.contractnetwork.assets.Contract#Contract2",
  "status": "Reject"
}
```
Bob在第三份合同上署名并盖章

Bob Submit Contract3 `SignContract` transaction:
```
{
  "$class": "org.synu.contractnetwork.transactions.SignContract",
  "contract": "resource:org.synu.contractnetwork.assets.Contract#Contract3",
  "sealImage": "resource:org.synu.contractnetwork.assets.SealImage#2",
  "sealImagePos": {
    "$class": "org.synu.contractnetwork.assets.SignatureImagePos",
    "x": 100,
    "y": 200
  },
  "status": "Signed"
}
```

Charlie再第三份合同上署名

Charlie Submit Contract3 `SignContract` transaction:
```
{
  "$class": "org.synu.contractnetwork.transactions.SignContract",
  "contract": "resource:org.synu.contractnetwork.assets.Contract#Contract3",
  "status": "Signed"
}
```

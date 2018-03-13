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

Contract are owned by a EndUser, and the value property on a SampleAsset can be modified by submitting a SampleTransaction. The SampleTransaction emits a SampleEvent that notifies applications of the old and new values for each modified SampleAsset.

To test this Business Network Definition in the **Test** tab:

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

Submit a `CreateContract` transaction:

```
{
  "$class": "org.synu.contractnetwork.transactions.CreateContract",
  "Id": "Contract1",
  "founder": "resource:org.synu.contractnetwork.participants.EndUser#Alice@example.org",
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

After submitting this transaction, you should now see the transaction in the Transaction Registry and that a `SampleEvent` has been emitted. As a result, the value of the `assetId:1` should now be `new value` in the Asset Registry.

Congratulations!


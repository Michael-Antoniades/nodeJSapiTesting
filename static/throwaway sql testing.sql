select 
a.PARTY_NAME||'|'||a.ADDRESS1||'|'||a.CITY||'|'||a.COUNTRY||'|'||a.ZIP_CODE||'|'||a.CUST_ACCT_ID||'|'||a.TAX_CODE||'|'||a.PARTY_SITE_ID||'|'||a.PARTY_ID||'|'||a.CURRENCY||'|'||a.CREDITLIMIT||'|'||a.PAYMENTTERMS||'|'||a.ACCOUNTCREATEDDATE||'|'||a.CUST_ACCT_PROFILE_ID||'|'||a.LOCATION_ID||'|'||a.CUSTINTERNALID||'|'||a.ACCOUNT_NUMBER||'|'||a.CUST_ACCT_SITE_ID||'|'||a.PRIMARYSUBSIDIARY||'|'||a.ADDRESSINTERNALID||'|'||a.PARTYSITENUMBER||'|'||a.PAYMENTTERMSID||'|'||a.LE_NAME||'|'||a.LE_INTERNALID||'|'||a.ADDRESS2||'|'||a.ADDRESS3||'|'||a.STATE||'|'||a.SITEOPERATION
||'|'||a.custgrouping||'|'||nvl(a.partysitename,a.PartySiteNumber)
row_data,
a.*
from
(select  p.PARTY_ID  party_id,
cp.CREDIT_CURRENCY_CODE  Currency,
cp.CREDIT_LIMIT  CreditLimit,
cp.STANDARD_TERMS  PaymentTermsId,
(select name
 from RA_TERMS_VL
where term_id=cp.STANDARD_TERMS
)  PaymentTerms,
hca.TAX_CODE  TAX_CODE,
to_char(hca.ACCOUNT_ESTABLISHED_DATE,'MM/DD/YYYY')  AccountCreatedDate,
cp.CUST_ACCOUNT_PROFILE_ID  Cust_ACCT_PROFILE_ID,
hca.CUST_ACCOUNT_ID  CUST_ACCT_ID,
-- HZ_CUST_ACCOUNTS.PARTY_ID  PARTY_ID_Cust_ACCTS,
hps.PARTY_SITE_ID  PARTY_SITE_ID,
--HZ_PARTY_SITES.OVERALL_PRIMARY_FLAG  OVERALL_PRIMARY_FLAG,
--HZ_PARTY_SITES.LOCATION_ID  LOCATION_ID_FROM_PARTY_SITES,
p.PARTY_NAME  PARTY_NAME,	  
	 l.LOCATION_ID  LOCATION_ID,
	 l.ADDRESS1  ADDRESS1,
 l.ADDRESS2  ADDRESS2,
 l.ADDRESS3  ADDRESS3,
nvl( l.STATE,l.PROVINCE) STATE,
	 l.CITY  CITY,
	 l.COUNTRY  COUNTRY,
	 l.POSTAL_CODE  ZIP_CODE,
	 hca.ATTRIBUTE1  CustInternalID ,
	 op.attribute1 primarySubsidiary,
	 hps.ATTRIBUTE1  AddressInternalID ,
 hca.ACCOUNT_NUMBER  Account_number,
 hps.party_site_number PartySiteNumber,
 hcas.Cust_acct_site_id,
 le.description le_name,
 le.attribute4 le_internalId,
 decode(nvl(hca.ATTRIBUTE1 ,'y'),'y','CREATE', decode(nvl(hps.attribute1,'x'),'x','CREATE','UPDATE')   ) siteoperation,
 hca.CUST_ACCOUNT_ID||'-'|| decode(nvl(hca.ATTRIBUTE1 ,'y'),'y','CREATE', decode(nvl(hps.attribute1,'x'),'x','CREATE','UPDATE')   ) custgrouping,
hps.party_site_name partysitename
--,ROW_NUMBER() OVER(PARTITION BY HZ_PARTIES.PARTY_NAME ORDER BY HZ_PARTIES.PARTY_NAME )  row_number
 from	HZ_PARTIES p,
	HZ_LOCATIONS l,
	HZ_PARTY_SITES hps ,
HZ_CUST_ACCOUNTS hca,
HZ_CUST_ACCT_SITES_ALL hcas,
HZ_CUSTOMER_PROFILES_F cp,
HZ_ORGANIZATION_PROFILES op,
(select v.*
 from FND_FLEX_VALUE_SETS vs,FND_FLEX_VALUES_VL v

where 1=1
and vs.FLEX_VALUE_SET_ID=v.FLEX_VALUE_SET_ID
and vs.flex_value_set_name like '%LICYCLE COA%'
and  vs.flex_value_set_name in ('Company LICYCLE COA')
and v.attribute4 is not null) le


WHERE hps.PARTY_ID = p.PARTY_ID
and op.party_id=p.party_id
and l.LOCATION_ID=hps.LOCATION_ID
and hca.PARTY_ID = p.PARTY_ID
and hcas.PARTY_SITE_ID = hps.PARTY_SITE_ID
and hcas.CUST_ACCOUNT_ID = hca.CUST_ACCOUNT_ID
and op.attribute1=le.FLEX_VALUE
and hca.CUST_ACCOUNT_ID = cp.CUST_ACCOUNT_ID
and op.attribute1=le.FLEX_VALUE
--and hca.ACCOUNT_NUMBER = 'TEST_894'

and hca.ACCOUNT_NUMBER in ('4001', 'TEST_894')
) A
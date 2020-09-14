-- EXTRACT TABLE NAMES
SELECT * FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name ASC

-- EXTRACT PUBLICATION COLUMNS
SELECT column_name FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'sd4_PublicationItem'--ORDER BY column_name ASC

--SELECT * FROM public."sd4_Changes"
--WHERE 'id' LIKE '%eps74%'
--OR 'Date' LIKE '%eps74%'
--OR 'Model' LIKE '%eps74%'
--OR 'ModelId' LIKE '%eps74%'
--OR 'UserId' LIKE '%eps74%'
--OR 'Action' LIKE '%eps74%'
--OR 'CHANGES' LIKE '%eps74%'
--OR 'UserName' LIKE '%eps74%'
--OR 'Title' LIKE '%eps74%'
--OR 'ModelName' LIKE '%eps74%'

--SELECT "id","Article" FROM public."sd4_PublicationItem"
--WHERE "id"::text LIKE '%eps74%' OR "Article"::text LIKE '%eps74%'


-- EXTRACT SUIS SiteName
SELECT "Value" FROM "public"."sd4_StringSetting"
WHERE id = (
	SELECT id FROM "public"."sd4_SettingBase"
	WHERE "Name" = 'SiteName'
)
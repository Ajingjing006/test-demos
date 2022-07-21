<?xml version="1.0" encoding="utf-8"?>
<trans name="menu3" desc="�˵�����ӿ�" notlog="true" localCacheSupport="true" localCacheInclude="moduleData">
   <!-- �����ģ��ɽ��б������飬����ȱʡֵ���Լ������ֶ�ת�� -->
   <snd>
      <field name="userId" required="false" type="C" desc="�û�ID" />
      <field name="os" required="true" type="C" desc="�ͻ���ϵͳid" />
      <field name="version" type="C" required="false" desc="�ͻ��˰汾��"/>
      <field name="cityId" required="false" type="C" desc="���б��" default="other"/>
       <field name="groupId" type="C" required="false" desc="�û�������" default="other"/>
       <field name="tabId" type="C" required="false" desc="tabId"/>
       <field name="mSort" type="C" required="false" desc="mSort"/>
       <!-- �������ã����ͻ��˱������� -->
       <field name="signature" type="C" required="false" desc="�ϴη��ر���md5ǩ��"/>
   </snd>
   <!-- ��Ӧ���ģ��ɹ�����Ӧ��Ϣ�����������ֵ���н��� -->
   <rcv>
      <field name="STATUS" length="6" type="C" desc="������" />
      <field name="MSG" length="100" type="C" desc="������Ϣ" />
      <!-- �������� -->
      <field name="signature" type="C" required="true" desc="���η���moduleDataǩ��"/>
      <field name="useLocalCache" type="C" required="true" desc="�Ƿ�ʹ�ñ��ػ���"/>
      
      <!-- ����������� -->
      <field-list name="moduleData" type="E">
                 <field name="mId" type="C" desc="ģ������" />
                 <field name="picName" type="C" desc="ͼƬ����" />
                 <field name="picClick" type="C" desc="ͼƬ���������"/>
                 <field name="name" type="C" desc="ģ������"/>
                 <field name="desc" type="C" desc="ģ������"/>
                 <field name="cityId" type="C" desc="ģ����������id"/>
                 <field name="groupId" type="C" desc="ģ�������û�����id"/>
                 <field name="createUser" type="C" desc="ģ�鴴����" />
                 <field name="os" type="C" desc="ģ��ͻ���ϵͳid" />
                 <field name="mType" type="C" desc="ģ�����ͱ��" />
                 <field name="paramId" type="C" desc="��������id"/>
                 <field name="paramData" type="C" desc="��������"/>
                 <field name="hrefName" type="C" desc="ģ��������ʾ����--���07010000,07020000�Ҳ���ʾ����" />
                 <field name="height" type="C" desc="ģ��߶�" />
                 <field name="mIndex" type="C" desc="����ģ���ڲ����"/>
                 <field name="isClock" type="C" desc="ģ���Ƿ�����" />
                 <field name="mLevel" type="C" desc="ģ�鼶��0,1,2,3"/>
                 <field name="parentId" type="C" desc="����ģ��id" />
                 <field name="dataIndex" type="C" desc="���ݲɼ�����" xpath="mIndex" />
                 <field name="activityPrice" type="C" desc="��۸�" />
                 <field name="cust" type="C" desc="��ȺID" />
                 <field name="dMStatus" type="C" desc="ģ��״̬" />
                 <field name="frontColor" type="C" desc="������ɫ" />
                 <field name="frontSize" type="C" desc="����ߴ�" />
                 <field name="funcCode" type="C" desc="����ID" />
                 <field name="goodsId" type="C" desc="��ƷID" />
                 <field name="isActivity" type="C" desc="�Ƿ�ģʽ" />
                 <field name="layout" type="C" desc="����ID" />
                 <field name="mDesc" type="C" desc="�Ǽ�ģ������" />
                 <field name="mHeight" type="C" desc="�Ǽ�ģ��߶�" />
                 <field name="mName" type="C" desc="�Ǽ�ģ������" />
                 <field name="mPic" type="C" desc="�Ǽ�ģ��ͼƬ" />
                 <field name="mRuleId" type="C" desc="�Ǽ�ģ�����ID" />
                 <field name="mRuleName" type="C" desc="�Ǽ�ģ���������" />
                 <field name="mSort" type="C" desc="�Ǽ�ģ�����" />
                 <field name="mStatus" type="C" desc="�Ǽ�ģ��״̬" />
                 <field name="module" type="C" desc="ģ��ID" />
                 <field name="originalPrice" type="C" desc="ԭʼ�۸�" />
                 <field name="picClickSize" type="C" desc="ͼƬ����ߴ�" />
                 <field name="picSize" type="C" desc="���ݲɼ�����" />
                 <field name="rule" type="C" desc="����" />
                 <field name="tdId" type="C" desc="TD���ݲɼ�����" />
           <field-list type="E" name="modules">
                 <field name="mId" type="C" desc="ģ������" />
                 <field name="picName" type="C" desc="ͼƬ����" />
                 <field name="picClick" type="C" desc="ͼƬ���������"/>
                 <field name="name" type="C" desc="ģ������"/>
                 <field name="desc" type="C" desc="ģ������"/>
                 <field name="cityId" type="C" desc="ģ����������id"/>
                 <field name="groupId" type="C" desc="ģ�������û�����id"/>
                 <field name="createUser" type="C" desc="ģ�鴴����" />
                 <field name="os" type="C" desc="ģ��ͻ���ϵͳid" />
                 <field name="mType" type="C" desc="ģ�����ͱ��" />
                 <field name="paramId" type="C" desc="��������id"/>
                 <field name="paramData" type="C" desc="��������"/>
                 <field name="hrefName" type="C" desc="ģ��������ʾ����--���07010000,07020000�Ҳ���ʾ����" />
                 <field name="height" type="C" desc="ģ��߶�" />
                 <field name="mIndex" type="C" desc="����ģ���ڲ����"/>
                 <field name="isClock" type="C" desc="ģ���Ƿ�����" />
                 <field name="mLevel" type="C" desc="ģ�鼶��0,1,2,3"/>
                 <field name="parentId" type="C" desc="����ģ��id" />
                 <field name="dataIndex" type="C" desc="���ݲɼ�����" xpath="mIndex" />
                 <field name="activityPrice" type="C" desc="��۸�" />
                 <field name="cust" type="C" desc="��ȺID" />
                 <field name="dMStatus" type="C" desc="ģ��״̬" />
                 <field name="frontColor" type="C" desc="������ɫ" />
                 <field name="frontSize" type="C" desc="����ߴ�" />
                 <field name="funcCode" type="C" desc="����ID" />
                 <field name="goodsId" type="C" desc="��ƷID" />
                 <field name="isActivity" type="C" desc="�Ƿ�ģʽ" />
                 <field name="layout" type="C" desc="����ID" />
                 <field name="mDesc" type="C" desc="�Ǽ�ģ������" />
                 <field name="mHeight" type="C" desc="�Ǽ�ģ��߶�" />
                 <field name="mName" type="C" desc="�Ǽ�ģ������" />
                 <field name="mPic" type="C" desc="�Ǽ�ģ��ͼƬ" />
                 <field name="mRuleId" type="C" desc="�Ǽ�ģ�����ID" />
                 <field name="mRuleName" type="C" desc="�Ǽ�ģ���������" />
                 <field name="mSort" type="C" desc="�Ǽ�ģ�����" />
                 <field name="mStatus" type="C" desc="�Ǽ�ģ��״̬" />
                 <field name="module" type="C" desc="ģ��ID" />
                 <field name="originalPrice" type="C" desc="ԭʼ�۸�" />
                 <field name="picClickSize" type="C" desc="ͼƬ����ߴ�" />
                 <field name="picSize" type="C" desc="���ݲɼ�����" />
                 <field name="rule" type="C" desc="����" />
                 <field name="tdId" type="C" desc="TD���ݲɼ�����" />
                 <field-list type="E" name="modules">
                      <field name="mId" type="C" desc="ģ������" />
                      <field name="picName" type="C" desc="ͼƬ����" />
                      <field name="picClick" type="C" desc="ͼƬ���������"/>
                      <field name="name" type="C" desc="ģ������" />
                      <field name="desc" type="C" desc="ģ������" />
                      <field name="cityId" type="C" desc="ģ����������id" />
                      <field name="groupId" type="C" desc="ģ�������û�����id"/>
                      <field name="createUser" type="C" desc="ģ�鴴����"/>
                      <field name="os" type="C" desc="ģ��ͻ���ϵͳid" />
                      <field name="mType" type="C" desc="ģ�����ͱ��"/>
                      <field name="paramId" type="C" desc="��������id" />
                      <field name="paramData" type="C" desc="��������"/>
                      <field name="hrefName" type="C" desc="ģ��������ʾ����--���07010000,07020000�Ҳ���ʾ����" />
                      <field name="height" type="C" desc="ģ��߶�" />
                      <field name="mIndex" type="C" desc="����ģ���ڲ����" />
                      <field name="isClock" type="C" desc="ģ���Ƿ�����"/>
                      <field name="mLevel" type="C" desc="ģ�鼶��0,1,2,3"/>
                      <field name="parentId" type="C" desc="����ģ��id" />
                      <field name="dataIndex" type="C" desc="���ݲɼ�����"/>
                      <field name="activityPrice" type="C" desc="��۸�" />
                      <field name="cust" type="C" desc="��ȺID" />
                      <field name="dMStatus" type="C" desc="ģ��״̬" />
                      <field name="frontColor" type="C" desc="������ɫ" />
                      <field name="frontSize" type="C" desc="����ߴ�" />
                      <field name="funcCode" type="C" desc="����ID" />
                      <field name="goodsId" type="C" desc="��ƷID" />
                      <field name="isActivity" type="C" desc="�Ƿ�ģʽ" />
                      <field name="layout" type="C" desc="����ID" />
                      <field name="mDesc" type="C" desc="�Ǽ�ģ������" />
                      <field name="mHeight" type="C" desc="�Ǽ�ģ��߶�" />
                      <field name="mName" type="C" desc="�Ǽ�ģ������" />
                      <field name="mPic" type="C" desc="�Ǽ�ģ��ͼƬ" />
                      <field name="mRuleId" type="C" desc="�Ǽ�ģ�����ID" />
                      <field name="mRuleName" type="C" desc="�Ǽ�ģ���������" />
                      <field name="mSort" type="C" desc="�Ǽ�ģ�����" />
                      <field name="mStatus" type="C" desc="�Ǽ�ģ��״̬" />
                      <field name="module" type="C" desc="ģ��ID" />
                      <field name="originalPrice" type="C" desc="ԭʼ�۸�" />
                      <field name="picClickSize" type="C" desc="ͼƬ����ߴ�" />
                      <field name="picSize" type="C" desc="���ݲɼ�����" />
                      <field name="rule" type="C" desc="����" />
                      <field name="tdId" type="C" desc="TD���ݲɼ�����" />
                      <field-list type="E" name="modules">
                            <field name="mId" type="C" desc="ģ������"/>
                            <field name="picName" type="C" desc="ͼƬ����" />
                            <field name="picClick" type="C" desc="ͼƬ���������"/>
                            <field name="name" type="C" desc="ģ������"/>
                            <field name="desc" type="C" desc="ģ������"/>
                            <field name="cityId" type="C" desc="ģ����������id"/>
                            <field name="groupId" type="C" desc="ģ�������û�����id"/>
                            <field name="createUser" type="C" desc="ģ�鴴����" />
                            <field name="os" type="C" desc="ģ��ͻ���ϵͳid"/>
                            <field name="mType" type="C" desc="ģ�����ͱ��" />
                            <field name="paramId" type="C" desc="��������id" />
                            <field name="paramData" type="C" desc="��������" />
                            <field name="hrefName" type="C" desc="ģ��������ʾ����--���07010000,07020000�Ҳ���ʾ����" />
                            <field name="height" type="C" desc="ģ��߶�" />
                            <field name="mIndex" type="C" desc="����ģ���ڲ����"/>
                            <field name="isClock" type="C" desc="ģ���Ƿ�����"/>
                            <field name="mLevel" type="C" desc="ģ�鼶��0,1,2,3" />
                            <field name="parentId" type="C" desc="����ģ��id" />
                            <field name="dataIndex" type="C" desc="���ݲɼ�����" xpath="mIndex"/>
                            <field name="activityPrice" type="C" desc="��۸�" />
                            <field name="cust" type="C" desc="��ȺID" />
                            <field name="dMStatus" type="C" desc="ģ��״̬" />
                            <field name="frontColor" type="C" desc="������ɫ" />
                            <field name="frontSize" type="C" desc="����ߴ�" />
                            <field name="funcCode" type="C" desc="����ID" />
                            <field name="goodsId" type="C" desc="��ƷID" />
                            <field name="isActivity" type="C" desc="�Ƿ�ģʽ" />
                            <field name="layout" type="C" desc="����ID" />
                            <field name="mDesc" type="C" desc="�Ǽ�ģ������" />
                            <field name="mHeight" type="C" desc="�Ǽ�ģ��߶�" />
                            <field name="mName" type="C" desc="�Ǽ�ģ������" />
                            <field name="mPic" type="C" desc="�Ǽ�ģ��ͼƬ" />
                            <field name="mRuleId" type="C" desc="�Ǽ�ģ�����ID" />
                            <field name="mRuleName" type="C" desc="�Ǽ�ģ���������" />
                            <field name="mSort" type="C" desc="�Ǽ�ģ�����" />
                            <field name="mStatus" type="C" desc="�Ǽ�ģ��״̬" />
                            <field name="module" type="C" desc="ģ��ID" />
                            <field name="originalPrice" type="C" desc="ԭʼ�۸�" />
                            <field name="picClickSize" type="C" desc="ͼƬ����ߴ�" />
                            <field name="picSize" type="C" desc="���ݲɼ�����" />
                            <field name="rule" type="C" desc="����" />
                            <field name="tdId" type="C" desc="TD���ݲɼ�����" />
                      </field-list>
                 </field-list>
           </field-list>
        </field-list>
      
      <!--Ĭ��ҳ������ -->
      <field name="LMF" length="6" type="C" desc="Ĭ��ҳ" />
      <!--�Զ���icon -->
      <field name="CustomIcons" length="200" type="C" desc="9���û����Զ���iconҵ��id" />
      <!--ȫ������ -->
      <field-list name="AllFunctions" type="E">
        <field name="FUNC_DESC" type="C" desc="������������"/>
        <field-list name="modules" type="E">
           <field name="FUNC_ID" type="C" desc="����id"/>
           <field name="FUNC_NAME" type="C" desc="��������" />
           <field name="FUNC_DESC" type="C" desc="������������"/>
           <field name="SMALL_ICON" type="C" desc="Сͼ��"/>
           <field name="MEDIUM_ICON" type="C" desc="�е�ͼ��"/>
           <field name="LARGE_ICON" type="C" desc="��ͼ��"/>
           <field name="BP_DESC" type="C" desc="���ר���ֶ�"/>
           <field name="TD_ID" type="C" desc="TDID"/>
           <field name="URL" type="C" desc="��ת����"/>
        </field-list>
      </field-list>
   </rcv>
</trans>
